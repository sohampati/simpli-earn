import os
import requests
import yfinance as yf
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.dates as mdates
from datetime import datetime, timedelta
from dotenv import load_dotenv
import pandas as pd
import numpy as np
import pytz

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")

# Known company → ticker mappings (expandable)
KNOWN_COMPANIES = {
    "TESLA": "TSLA",
    "APPLE": "AAPL",
    "GOOGLE": "GOOGL",
    "ALPHABET": "GOOGL",
    "AMAZON": "AMZN",
    "MICROSOFT": "MSFT",
    "META": "META",
    "FACEBOOK": "META",
    "NETFLIX": "NFLX",
    "NVIDIA": "NVDA",
    "INTEL": "INTC",
    "UBER": "UBER",
    "ADOBE": "ADBE"
}

def extract_video_id(youtube_link):
    """Extract the video ID from a YouTube URL"""
    if "v=" in youtube_link:
        return youtube_link.split("v=")[1].split("&")[0]
    elif "youtu.be/" in youtube_link:
        return youtube_link.split("youtu.be/")[1].split("?")[0]
    else:
        return youtube_link

def get_youtube_metadata(video_id):
    """Get upload date and title of a YouTube video"""
    url = f'https://www.googleapis.com/youtube/v3/videos?id={video_id}&part=snippet&key={api_key}'
    response = requests.get(url)
    data = response.json()

    if 'items' in data and len(data['items']) > 0:
        snippet = data['items'][0]['snippet']
        upload_date = snippet['publishedAt']
        title = snippet['title']
        return upload_date, title
    else:
        print(f"Error retrieving metadata: {data.get('error', {}).get('message', 'Unknown error')}")
        return None, None

def guess_ticker_from_title(title):
    """Try to determine stock ticker from video title"""
    title_upper = title.upper()
    for company, ticker in KNOWN_COMPANIES.items():
        if company in title_upper:
            return ticker
    
    print("⚠️ Could not determine ticker from title.")
    return input("Please enter the stock ticker manually: ").upper()

def get_stock_chart(ticker, event_date_str):
    """Generate stock chart for exactly 48 hours (24 from event day, 24 from next day)"""
    try:
        # Setup Seaborn style
        sns.set_style("whitegrid")
        plt.rcParams.update({
            'font.size': 12,
            'axes.labelweight': 'bold',
            'axes.titleweight': 'bold'
        })

        # Parse the event date
        event_date = datetime.strptime(event_date_str, "%m/%d/%y")
        
        # Set the start of day for event_date and the day after
        day_start = datetime(event_date.year, event_date.month, event_date.day, 0, 0, 0)
        next_day_start = day_start + timedelta(days=1)
        next_day_end = next_day_start + timedelta(days=1)
        
        # Set up time range to ensure we get enough data
        # Pull data from before the start day to after the end day to ensure coverage
        start_time = day_start - timedelta(days=1)  # Add buffer before
        end_time = next_day_end + timedelta(days=1)  # Add buffer after
        
        print(f"📊 Fetching stock data from {start_time.strftime('%Y-%m-%d')} to {end_time.strftime('%Y-%m-%d')}")

        # Download stock data at highest resolution possible
        stock_data = yf.download(
            ticker,
            start=start_time,
            end=end_time,
            interval="1h"
        )
        
        if stock_data.empty:
            print(f"❌ No stock data found for {ticker} in the specified time range.")
            return

        # Ensure timezone information is present
        eastern_tz = pytz.timezone('US/Eastern')
        if stock_data.index.tz is None:
            stock_data.index = stock_data.index.tz_localize('UTC').tz_convert(eastern_tz)
        else:
            stock_data.index = stock_data.index.tz_convert(eastern_tz)

        # Create a DataFrame with exactly 48 hourly slots for the two days
        hours = []
        for day in [day_start, next_day_start]:
            for hour in range(24):  # 0 to 23 hours for each day
                hours.append(eastern_tz.localize(datetime(day.year, day.month, day.day, hour, 0, 0)))
        
        # Create empty DataFrame with these hours
        perfect_hours_df = pd.DataFrame(index=hours, columns=['Close'])
        perfect_hours_df['Close'] = np.nan
        
        # For each hour in our perfect grid, find the closest data point in the actual stock data
        for hour in hours:
            # Find nearest data point before and after our target hour
            data_before = stock_data[stock_data.index <= hour]
            data_after = stock_data[stock_data.index > hour]
            
            if not data_before.empty:
                # Get the most recent price before this hour
                perfect_hours_df.at[hour, 'Close'] = data_before['Close'].iloc[-1]
            elif not data_after.empty:
                # If no prior data, use the next available price
                perfect_hours_df.at[hour, 'Close'] = data_after['Close'].iloc[0]
                
        # Forward fill any remaining NaN values
        perfect_hours_df.fillna(method='ffill', inplace=True)
        
        # If still have NaNs at the beginning, backfill
        perfect_hours_df.fillna(method='bfill', inplace=True)
        
        print(f"✅ Data points: {len(perfect_hours_df)} (should be exactly 48)")
        
        # Create the plot
        plt.figure(figsize=(16, 8))
        
        # Plot the exactly 48 data points
        plt.plot(perfect_hours_df.index, perfect_hours_df['Close'], 
                marker='o', linestyle='-', linewidth=2, color='#1f77b4', label='Close Price')
        
        # Add a vertical line at midnight between the two days
        plt.axvline(x=next_day_start, color='red', linestyle='--', alpha=0.7, 
                    label=f'Start of Day After ({next_day_start.strftime("%m/%d/%y")})')
        
        # Set titles and labels
        day_str = day_start.strftime("%m/%d/%y")
        next_day_str = next_day_start.strftime("%m/%d/%y")
        plt.title(f"{ticker} Stock Price: {day_str} and {next_day_str} (48 Hours)", fontsize=16, pad=20)
        plt.xlabel("Time (Eastern Time)", fontsize=13)
        plt.ylabel("Price (USD)", fontsize=13)
        
        # Format x-axis for better readability
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m-%d %H:%M', tz=eastern_tz))
        plt.xticks(rotation=45)
        
        # Add grid and legend
        plt.grid(True, linestyle='--', alpha=0.6)
        plt.legend(loc='best')
        plt.tight_layout()
        
        # Show percentage change from start of first day
        start_price = perfect_hours_df['Close'].iloc[0]
        
        # Calculate percentage change relative to start price
        pct_changes = ((perfect_hours_df['Close'] - start_price) / start_price) * 100
        
        # Create a secondary y-axis for percentage change
        ax2 = plt.gca().twinx()
        ax2.plot(perfect_hours_df.index, pct_changes, color='green', linestyle=':', alpha=0.6)
        ax2.set_ylabel('Percent Change from Start (%)', color='green')
        ax2.tick_params(axis='y', labelcolor='green')
        
        plt.savefig(f"{ticker}_48hr_chart.png")
        plt.show()
        
        # Display summary statistics
        print("\n📈 SUMMARY STATISTICS:")
        # First day stats
        first_day_data = perfect_hours_df.iloc[:24]
        first_day_min = first_day_data['Close'].min()
        first_day_max = first_day_data['Close'].max()
        first_day_change = first_day_data['Close'].iloc[-1] - first_day_data['Close'].iloc[0]
        first_day_pct = (first_day_change / first_day_data['Close'].iloc[0]) * 100
        
        # Second day stats
        second_day_data = perfect_hours_df.iloc[24:]
        second_day_min = second_day_data['Close'].min()
        second_day_max = second_day_data['Close'].max()
        second_day_change = second_day_data['Close'].iloc[-1] - second_day_data['Close'].iloc[0]
        second_day_pct = (second_day_change / second_day_data['Close'].iloc[0]) * 100
        
        # Overall stats
        overall_change = perfect_hours_df['Close'].iloc[-1] - perfect_hours_df['Close'].iloc[0]
        overall_pct = (overall_change / perfect_hours_df['Close'].iloc[0]) * 100
        
        print(f"Day 1 ({day_str}):")
        print(f"  Range: ${first_day_min:.2f} - ${first_day_max:.2f}")
        print(f"  Change: ${first_day_change:.2f} ({first_day_pct:.2f}%)")
        
        print(f"\nDay 2 ({next_day_str}):")
        print(f"  Range: ${second_day_min:.2f} - ${second_day_max:.2f}")
        print(f"  Change: ${second_day_change:.2f} ({second_day_pct:.2f}%)")
        
        print(f"\nOverall 48-Hour Change: ${overall_change:.2f} ({overall_pct:.2f}%)")

    except Exception as e:
        print(f"❌ An error occurred: {e}")
        import traceback
        traceback.print_exc()

# Main execution
def main():
    youtube_link = input("Enter YouTube Earnings Call Link: ")
    video_id = extract_video_id(youtube_link)
    
    if not video_id:
        print("❌ Could not extract video ID from the provided link.")
        return
        
    print(f"🔍 Analyzing video ID: {video_id}")
    upload_date, title = get_youtube_metadata(video_id)

    if upload_date and title:
        # Convert UTC time to a more readable format
        upload_datetime = datetime.strptime(upload_date, "%Y-%m-%dT%H:%M:%SZ")
        formatted_date = upload_datetime.strftime("%m/%d/%y")
        
        print(f"\n🎬 YouTube Video: '{title}'")
        print(f"🗓️ Upload Date: {formatted_date} ({upload_datetime.strftime('%Y-%m-%d %H:%M:%S')} UTC)")

        # Detect ticker from title
        ticker = guess_ticker_from_title(title)
        print(f"💹 Detected Ticker: {ticker}")

        # Generate stock chart
        get_stock_chart(ticker, formatted_date)
    else:
        print("❌ Error: Could not retrieve YouTube metadata. Check your API key and video link.")

if __name__ == "__main__":
    main()