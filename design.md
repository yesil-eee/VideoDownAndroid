# VideoDownAndroid - Design Plan

## Overview
An Android mobile application for downloading YouTube videos and playlists with quality selection, progress tracking, and file management. Designed for one-handed use in portrait orientation (9:16).

## Screen List

1. **Home Screen** - Main download interface
2. **Downloads Screen** - Manage downloaded videos and playlists
3. **Settings Screen** - Configure quality preferences, storage location, cookies
4. **Download Details Screen** - View progress, quality info, and download history

## Primary Content and Functionality

### 1. Home Screen
- **URL Input Field**: Paste YouTube video or playlist URL
- **Download Mode Selector**: Toggle between Video (MP4) and Audio (MP3)
- **Quality Selector**: Dropdown with options (1080p, 720p, 480p, 360p, etc.)
- **Large Download Button**: Start download action
- **Recent Downloads List**: Show last 5 downloads with status
- **Quick Stats**: Total downloaded, storage used

### 2. Downloads Screen
- **Active Downloads Section**: Show ongoing downloads with progress bars
- **Completed Downloads List**: Organized by date, with file size and quality info
- **Search/Filter**: Find downloads by title or date
- **Actions**: Play, delete, share, or re-download with different quality

### 3. Settings Screen
- **Default Quality**: Set preferred resolution
- **Storage Location**: Choose where to save files
- **Cookie Management**: Load cookies from browser or file
- **Download Preferences**: Concurrent downloads, retry attempts
- **About**: App version and developer info

### 4. Download Details Screen
- **Video Information**: Title, channel, duration, thumbnail
- **Quality Options**: Available resolutions for current video
- **Download Progress**: Percentage, speed, ETA
- **Download History**: Previous attempts with quality used

## Key User Flows

### Flow 1: Download a Video
1. User opens app → Home screen
2. Pastes YouTube URL → Input field
3. Selects quality (default 1080p) → Quality dropdown
4. Taps "Download" button
5. Progress screen shows → Real-time updates
6. Download completes → Notification + added to Downloads
7. User can play or share from Downloads screen

### Flow 2: Download a Playlist
1. User pastes playlist URL → Home screen
2. Selects quality and mode (MP4/MP3)
3. Taps "Download" → Starts downloading all videos
4. Progress shows total/completed videos
5. Each video appears in Downloads as it completes
6. User can pause/resume entire playlist

### Flow 3: Manage Downloaded Files
1. User navigates to Downloads screen
2. Sees list of downloaded videos with thumbnails
3. Can filter by date or search by title
4. Long-press on item → Shows options (play, delete, share, info)
5. Swipe to delete or mark as favorite

## Color Choices

| Element | Color | Hex |
|---------|-------|-----|
| Primary (Download button) | Professional Green | #2e7d32 |
| Accent (Active, Resume) | Light Green | #27ae60 |
| Danger (Stop, Delete) | Red | #dc3545 |
| Background | Dark Gray | #151718 |
| Surface (Cards) | Slightly Lighter Gray | #1e2022 |
| Text Primary | Off-white | #ECEDEE |
| Text Secondary | Medium Gray | #9BA1A6 |
| Success | Green | #4ADE80 |
| Warning | Orange | #FBBF24 |
| Error | Red | #F87171 |

## Layout Specifics

- **Safe Area**: All content respects notch and home indicator
- **Tab Navigation**: Home, Downloads, Settings at bottom
- **One-handed**: All interactive elements within thumb reach (bottom 2/3 of screen)
- **Touch targets**: Minimum 44pt × 44pt for buttons
- **Spacing**: Consistent 16pt padding between sections
- **Typography**: 
  - Headings: 24pt bold
  - Body: 16pt regular
  - Small text: 12pt

## Interaction Patterns

- **Download Button**: Scale feedback on press + haptic
- **Progress**: Animated progress bar with percentage text
- **List Items**: Tap to view details, long-press for actions
- **Swipe Actions**: Swipe left to delete, swipe right to favorite
- **Pull-to-Refresh**: On Downloads screen to sync file list

## Performance Considerations

- Lazy load thumbnails in Downloads list
- Cache video metadata locally
- Limit concurrent downloads to 2-3 by default
- Show loading states for all async operations
- Implement proper error handling with retry options
