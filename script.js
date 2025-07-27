document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const videoAudioRadio = document.getElementById('videoAudio');
    const audioOnlyRadio = document.getElementById('audioOnly');
    const transcriptOnlyRadio = document.getElementById('transcriptOnly');
    const videoOptions = document.getElementById('videoOptions');
    const audioOptions = document.getElementById('audioOptions');
    const transcriptOptions = document.getElementById('transcriptOptions');
    const saveToTextFileCheckbox = document.getElementById('saveToTextFile');
    const textFileOptions = document.getElementById('textFileOptions');
    const playlistCheckbox = document.getElementById('playlist');
    const playlistOptions = document.getElementById('playlistOptions');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const commandOutput = document.getElementById('commandOutput');

    // Toggle options based on download type
    videoAudioRadio.addEventListener('change', toggleDownloadOptions);
    audioOnlyRadio.addEventListener('change', toggleDownloadOptions);
    transcriptOnlyRadio.addEventListener('change', toggleDownloadOptions);
    saveToTextFileCheckbox.addEventListener('change', toggleTextFileOptions);
    playlistCheckbox.addEventListener('change', togglePlaylistOptions);

    // Generate command on button click
    generateBtn.addEventListener('click', generateCommand);

    // Copy command to clipboard
    copyBtn.addEventListener('click', copyToClipboard);

    // Initial toggle of options
    toggleDownloadOptions();
    toggleTextFileOptions();
    togglePlaylistOptions();

    /**
     * Toggle video/audio/transcript options based on download type
     */
    function toggleDownloadOptions() {
        // Hide all option groups first
        videoOptions.classList.add('hidden');
        audioOptions.classList.add('hidden');
        transcriptOptions.classList.add('hidden');
        
        // Show the appropriate option group
        if (videoAudioRadio.checked) {
            videoOptions.classList.remove('hidden');
        } else if (audioOnlyRadio.checked) {
            audioOptions.classList.remove('hidden');
        } else if (transcriptOnlyRadio.checked) {
            transcriptOptions.classList.remove('hidden');
        }
    }

    /**
     * Toggle text file options
     */
    function toggleTextFileOptions() {
        if (saveToTextFileCheckbox.checked) {
            textFileOptions.classList.remove('hidden');
        } else {
            textFileOptions.classList.add('hidden');
        }
    }

    /**
     * Toggle playlist options
     */
    function togglePlaylistOptions() {
        if (playlistCheckbox.checked) {
            playlistOptions.classList.remove('hidden');
        } else {
            playlistOptions.classList.add('hidden');
        }
    }

    /**
     * Generate the yt-dlp command
     */
    function generateCommand() {
        const videoUrls = document.getElementById('videoUrls').value.trim();
        const outputDir = document.getElementById('outputDir').value.trim();
        const filenameTemplate = document.getElementById('filenameTemplate').value.trim();
        const isVideoAudio = videoAudioRadio.checked;
        const isTranscriptOnly = transcriptOnlyRadio.checked;
        const subtitles = document.getElementById('subtitles').checked;
        const thumbnails = document.getElementById('thumbnails').checked;
        const saveToTextFile = saveToTextFileCheckbox.checked;
        const textFilename = document.getElementById('textFilename').value.trim();
        const playlistDownload = document.getElementById('playlist').checked;
        const playlistStart = document.getElementById('playlistStart').value.trim();
        const playlistEnd = document.getElementById('playlistEnd').value.trim();

        // Check if video URLs are provided
        if (!videoUrls) {
            alert('Please provide at least one video URL.');
            return;
        }

        // Base command
        let command = 'yt-dlp';

        // Format string
        let formatString = '';
        
        if (isTranscriptOnly) {
            // Transcript only download
            const transcriptFormat = document.getElementById('transcriptFormat').value;
            const transcriptLang = document.getElementById('transcriptLang').value.trim();
            
            // Skip downloading the actual video/audio
            command += ' --skip-download';
            
            // Add transcript download options
            command += ' --write-auto-sub';  // Auto-generated subtitles if needed
            command += ' --write-sub';       // Regular subtitles
            
            // Set the subtitle format
            command += ` --sub-format ${transcriptFormat}`;
            
            // Set subtitle language if provided
            if (transcriptLang) {
                command += ` --sub-langs "${transcriptLang}"`;
            }
            
            // No format string needed for transcript-only
            formatString = '';
            
        } else if (isVideoAudio) {
            // Video with audio
            const videoFormat = document.getElementById('videoFormat').value;
            const videoQuality = document.getElementById('videoQuality').value;
            
            if (videoFormat === 'best' && videoQuality === 'best') {
                formatString = 'bestvideo+bestaudio/best';
            } else if (videoQuality === 'best') {
                formatString = `bestvideo[ext=${videoFormat}]+bestaudio/best[ext=${videoFormat}]`;
            } else {
                formatString = `bestvideo[height<=${videoQuality}][ext=${videoFormat === 'best' ? 'mp4' : videoFormat}]+bestaudio/best[height<=${videoQuality}]`;
            }
        } else {
            // Audio only
            const audioFormat = document.getElementById('audioFormat').value;
            const audioQuality = document.getElementById('audioQuality').value;
            
            if (audioFormat === 'best') {
                command += ' -x';
                formatString = 'bestaudio/best';
            } else {
                command += ' -x --audio-format ' + audioFormat;
                formatString = 'bestaudio/best';
            }
            
            if (audioQuality !== '0') {
                command += ' --audio-quality ' + audioQuality;
            }
        }

        // Add format if specified
        if (formatString) {
            command += ` -f "${formatString}"`;
        }

        // Add output path and template
        if (outputDir) {
            // Make sure path is properly escaped
            let outputTemplate = filenameTemplate;
            
            // For playlists, add a three-digit index at the beginning of the filename
            if (playlistDownload) {
                // Use the playlist_index variable from yt-dlp and format it to have 3 digits
                outputTemplate = '%(playlist_index)03d_' + outputTemplate;
            }
            
            const outputPath = outputDir.replace(/\\/g, '\\\\') + '\\\\' + outputTemplate;
            command += ` -o "${outputPath}"`;
        }

        // Add subtitles option
        if (subtitles) {
            command += ' --write-subs --sub-langs "en.*"';
        }

        // Add thumbnail option
        if (thumbnails) {
            command += ' --write-thumbnail';
        }
        
        // Add playlist options
        if (playlistDownload) {
            command += ' --yes-playlist';
            
            if (playlistStart) {
                command += ` --playlist-start ${playlistStart}`;
            }
            
            if (playlistEnd) {
                command += ` --playlist-end ${playlistEnd}`;
            }
        } else {
            command += ' --no-playlist';
        }

        // Handle video URLs
        if (saveToTextFile && textFilename) {
            // Create URLs file reference
            command += ` -a ${textFilename}`;
            
            // Also show the content that should be in the text file
            commandOutput.value = `# Command:\n${command}\n\n# Content for ${textFilename}:\n${videoUrls}`;
        } else {
            // Add URLs directly to the command
            const urlList = videoUrls.split('\n')
                .map(url => url.trim())
                .filter(url => url)
                .map(url => `"${url}"`) // Wrap each URL in double quotes to handle special characters like &
                .join(' ');
            
            command += ` ${urlList}`;
            commandOutput.value = command;
        }

        // Scroll to the output
        commandOutput.scrollIntoView({ behavior: 'smooth' });
        // Also copy the first link to clipboard
        const urlListRaw = videoUrls.split('\n').map(url => url.trim()).filter(url => url);
        if (urlListRaw.length > 0) {
            // Create a temporary textarea to copy the first link
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = urlListRaw[0];
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
        }
    }

    /**
     * Copy the generated command to clipboard
     */
    function copyToClipboard() {
        commandOutput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓';
        copyBtn.style.backgroundColor = '#4CAF50';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }
});
