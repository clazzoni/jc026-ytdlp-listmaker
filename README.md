# yt-dlp Command Generator_

This web application helps you generate command strings for the [yt-dlp](https://github.com/yt-dlp/yt-dlp) tool to download YouTube videos.

## Features

- Input multiple YouTube video URLs
- Select video/audio format and quality options (240p to 4K)
- Option for audio-only downloads
- Option to download only transcripts/subtitles in various formats (SRT, VTT, etc.)
- Download full playlists with start/end control
- Customize output directory and filename templates
- Generate yt-dlp command strings
- Copy commands to clipboard with one click
- Save URLs to a text file for batch processing

## How to Use

1. Open `index.html` in your web browser
2. Input one or more YouTube URLs (one per line)
3. Configure download options:
   - Select video with audio or audio only
   - Choose formats and quality
   - Set output directory
   - Customize filename template
4. Click "Generate Command" to create the yt-dlp command
5. Copy the generated command with the clipboard button
6. Paste the command into your terminal/command prompt to download

## Example Commands

The application can generate commands similar to these examples:

- Basic download:
  ```
  yt-dlp "https://www.youtube.com/watch?v=example"
  ```

- Download with specific format and output directory:
  ```
  yt-dlp -f "bestvideo[width<=640]+bestaudio/best[width<=640]" -o "D:\Videos\%(title)s.%(ext)s" "https://www.youtube.com/watch?v=example"
  ```

- Batch download from text file:
  ```
  yt-dlp -a urls.txt -f "bestvideo[height<=720]+bestaudio/best" -o "D:\Videos\%(title)s.%(ext)s"
  ```

- Download full YouTube playlist (with three-digit index):
  ```
  yt-dlp --yes-playlist -f "bestvideo[height<=1080]+bestaudio/best" -o "D:\Videos\%(playlist)s\%(playlist_index)03d_%(title)s.%(ext)s" "https://www.youtube.com/playlist?list=EXAMPLE"
  ```

- Download only transcript/subtitles:
  ```
  yt-dlp --skip-download --write-sub --write-auto-sub --sub-format srt --sub-langs "en" -o "D:\Videos\%(title)s.%(ext)s" "https://www.youtube.com/watch?v=EXAMPLE"
  ```

## Requirements

- A web browser
- yt-dlp installed on your system
- FFmpeg (for some format conversions)

## Resources

- [yt-dlp GitHub Repository](https://github.com/yt-dlp/yt-dlp)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp#readme)
