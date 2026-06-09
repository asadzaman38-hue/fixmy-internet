---
title: "AT&T BGW320 internet slow speed fix"
date: "2026-06-09T10:49:45.228Z"
description: "Step-by-step troubleshooting guide for AT&T BGW320 internet slow speed fix on AT&T BGW320 router."
tags: ["AT&T","BGW320","Internet","Fix"]
draft: false
---
# AT&T BGW320 Internet Slow Speed Fix: Complete Troubleshooting Guide

## Quick Answer  
Restart your BGW320 router by unplugging it for 30 seconds, then check for firmware updates via 192.168.1.254. If speeds remain slow, flush DNS settings or reset the gateway through the admin panel.

---

## Symptoms  
Your AT&T BGW320 router may be causing slow internet if you experience:  
- Web pages loading slowly or timing out  
- Video streaming buffering frequently  
- Download speeds significantly below your plan’s advertised rate  
- Devices disconnecting or showing “No Internet” intermittently  
- High latency (ping) during online gaming or video calls  

---

## Causes  
Slow speeds often stem from:  
- Outdated firmware on the BGW320  
- Network congestion from too many connected devices  
- Interference from nearby electronics or thick walls  
- Incorrect DNS settings  
- Corrupted router configuration or hardware issues  

---

## Step-by-Step Fixes  

### 1. Restart the Router  
Unplug the power cord from the back of the BGW320 for at least 30 seconds. Plug it back in and wait 2–3 minutes for full startup. This clears temporary memory errors and reconnects your devices.

### 2. Check Physical Connections  
Ensure all cables (Ethernet and coaxial) are securely connected. A loose connection can degrade performance. Replace damaged cables if necessary.

### 3. Run a Speed Test  
Use [speedtest.net](https://www.speedtest.net) or the AT&T Smart Home Manager app to compare your current speeds against your plan. If results are consistently below 80% of your plan’s speed, proceed to advanced fixes.

### 4. Update Firmware  
Access the router’s admin panel by typing **192.168.1.254** in a browser. Log in with your credentials (default is usually printed on the router label). Navigate to **Settings > System > Firmware Upgrade** and install any available updates.

### 5. Limit Connected Devices  
Too many devices can overwhelm the router. Disconnect unused devices or pause background downloads/uploads on active ones.

### 6. Change Wi-Fi Channel  
In the admin panel, go to **Wireless > Basic Settings**. Switch the channel to 1, 6, or 11 (for 2.4 GHz) to avoid interference from neighbors’ networks.

---

## Advanced Fixes  

### 1. Flush DNS Cache  
On Windows, open Command Prompt as admin and run:  
```
ipconfig /flushdns
```  
On macOS/Linux, restart the router to clear cached DNS entries.

### 2. Manually Set DNS Servers  
In the admin panel (**192.168.1.254**), go to **Internet > DNS**. Select **Manual** and enter:  
- Primary DNS: `8.8.8.8`  
- Secondary DNS: `8.8.4.4`  
This bypasses AT&T’s slower DNS servers.

### 3. Reset the Gateway  
If all else fails, perform a factory reset:  
1. Locate the small **Reset** button on the back of the router.  
2. Press and hold for 15 seconds using a paperclip.  
3. Wait for the router to reboot (about 3 minutes).  
⚠️ Warning: This erases all custom settings (Wi-Fi name/password, port forwards).

### 4. Disable Smart Limits (if enabled)  
In the AT&T Smart Home Manager app, check **Smart Limits** under Parental Controls. Temporarily disable them to rule out throttling.

---

## Common Mistakes  
Avoid these errors:  
- Skipping a full router restart (unplugging for <10 seconds)  
- Ignoring firmware updates, which patch performance bugs  
- Changing advanced settings without understanding their purpose  
- Not testing speeds over both Wi-Fi and Ethernet  
- Resetting the router repeatedly without addressing root causes  

---

## FAQ  

**Q1: How do I test my BGW320 speed accurately?**  
Connect directly via Ethernet and close all apps using bandwidth. Test at [speedtest.net](https://www.speedtest.net) during off-peak hours (early morning).

**Q2: Will resetting my BGW320 delete my Wi-Fi password?**  
Yes. After reset, you’ll need to reconnect devices using the default SSID and password printed on the router label.

**Q3: Why is my BGW320 slower than other routers?**  
Ensure you’re not confusing the BGW320 with older models. It supports modern standards (Wi-Fi 6, 4x4 MIMO). Slow speeds may indicate line issues or outdated firmware.

**Q4: Can I use my own router instead of the BGW320?**  
Yes, but AT&T may charge a rental fee waiver if you return the BGW320. Contact AT&T to confirm compatibility.

**Q5: How often should I restart my BGW320?**  
Monthly restarts prevent memory leaks. Daily restarts aren’t necessary and may shorten hardware lifespan.

---

## Related Guides  
[/internet/att/bgw320/](/internet/att/bgw320/)
