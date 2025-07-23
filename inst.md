
Make a web page that can generate a string that can be used with the exe-file yt-dlp.exe to download a YouTube videos. 


- Generate a string based on user input. I will copy the string and use it in the command line to download the video.
- The web page should allow the user to input multiple a YouTube video URLs. I will copy the links to the clipboard and paste them into the input field.
- The user should be able to select options for format and quality, and specify an output file name. Typical options might include formats like mp4, webm, or audio formats, and qualities like 720p, 1080p, etc.
- There should be an option for 'autdio only' downloads
- There should be a button to generate the command string based on the input from the user.
- There should be a input field for the user to specify the output catalog where the downloaded files will be saved.


some example command strings can be found here:
https://ostechnix.com/yt-dlp-tutorial/
https://www.rapidseedbox.com/blog/yt-dlp-complete-guide

a simple example command string:
yt-dlp https://www.youtube.com/watch?v=t5b20oLaIaw basic download

yt-dlp -f "bestvideo[width<=640]+bestaudio/best[width<=640]" -o "D:\VIDEOJUNK\109 MISC\%(title)s.%(ext)s" [link]

yt-dlp -a DL01.txt -f "bestvideo[width<=640]+bestaudio/best[width<=640]" -o "D:\VIDEOJUNK\110 LABS\%(title)s.%(ext)s"

yt-dlp --list-formats 



- the video quality should be selectable from a dropdown menu, with options like 'best available', '1080p', '720p', '480p', '360p', '240p' 

- make sure there is a functionality to dowload full playlists, not just single videos.


- make the default output directory: D:\VIDEOJUNK

- make the default video quality: 720p

- remove the bullet point text below 'Common templates:'


