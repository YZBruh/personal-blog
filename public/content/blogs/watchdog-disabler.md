---
author: "Yağız Zengin"
title: "Watchdog Disabler Module"
description: "Watchdog regularly is forced to deactivate against random reboot issue"
date: "25 Jully 2025"
tags: ["Android", "Module"]
---

# Watchdog Disabler
Some GSIs on Android devices can cause random reboots. This is usually caused by the `watchdog`. This module is designed to fix this issue. Compatible with Magisk, APatch, KSU.

## What is `watchdog`
A `watchdog` is a monitoring system built into the kernel. It performs a system reboot based on whether the system has frozen. Its logic is as follows: if no data is written to the `watchdog`'s device (`/dev/watchdog*``) for a certain period of time (such as 10 seconds), the watchdog considers the system frozen and reboots it.

## How does the module work?
What this module does is write data to the watchdog devices at 8-second intervals. The letter '`V`' is used to disable it. Other modules generally do this once and then quit, but in some cases, the data written there is invalidated (changed, etc.). When invalidated, the `watchdog` still runs, causing the random reboot issue (if any). This module, therefore, writes data continuously and tries to prevent this as much as possible.

### GitHub page & downloads
 - [Download Module](https://github.com/YZBruh/watchdog_disabler/releases)
 - [GitHub Page](https://github.com/YZBruh/watchdog_disabler)
