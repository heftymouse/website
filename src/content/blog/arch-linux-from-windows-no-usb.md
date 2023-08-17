---
title: Installing Arch Linux from Windows without a Live USB
description: A difficult solution to an unlikely problem.
date: 2023-08-17
---

I had a hankering to install bare-metal Linux again to inform myself on the latest and greatest updates in the world of desktop Linux, to see if `(currentYear + 1)` will truly be the year that the entire world simultaneously changes their operating system. However, I realized I did not have a suitable flash drive to install the Arch installer to (seriously, everyone has a million tiny USBs all the time, how did I end up like this), and thus set out on this foolish (but successful!) journey.

## The tl;dr

I installed Arch to a VHD(x) using WSL, created a root partition in Windows using WinBtrfs, cloned the VHD to said partition, copied over the kernel and initrd to my EFI partition, and used the UEFI Shell to create an EFISTUB boot entry.

## The actual guide

This is the part with somewhat detailed instructions. This guide doesn't cover how to install Arch — that would be wasteful, feel free to consult the excellent [Arch Wiki](https://wiki.archlinux.org/title/Installation_guide) for that.

### Prerequisites

- A version of Windows that supports `wsl --mount` (Windows 11 build 22000 and above)
- A WSL distro, ideally [Arch WSL](https://github.com/yuk7/ArchWSL) for simplicity
- [WinBtrfs](https://github.com/maharmstone/btrfs)
- [UEFI Shell](https://github.com/pbatard/UEFI-Shell)
- Free time and a system restart

Make sure to save all your work before starting — you may experience BSODs from WinBtrfs.

### Preparing the 'install disk'

Create a VHDX of your desired size anywhere you choose, and attach it to WSL.

```powershell
New-VHD -Path ~/Documents/arch.vhdx -SizeBytes 90GB
Mount-VHD -Path ~/Documents/arch.vhdx
# replace  <n> with the number from Get-PhysicalDisk
wsl --mount \\.\PHYSICALDRIVE<n> --bare
```

Skipping this and directly installing to your root partition mounted in Windows is possible, but I didn't do it since it seemed to be much slower overall than copying after the fact. I'm not entirely sure though; more testing may be required.

### Installing Arch

I recommend using Arch WSL for this since you can easily use the same tools as the Live USB. Install the `arch-install-scripts` package, and follow the rest of the [installation guide](https://wiki.archlinux.org/title/Installation_guide#Partition_the_disks) as usual for your mounted VHD.

Some things to note:

- I formatted the root partition as Btrfs since it works well enough on both Windows and Linux, and is a good default choice anyways. ext4 and NTFS may work in theory, but I haven't looked into either.
- Only install the minimum packages you need to be able to install the rest of your system, or prepare for a very slow next step.

### Creating the actual root partition

Create a Btrfs partition on your chosen disk and assign it a letter of your choice. Add the following to `/etc/wsl.conf` in WSL, if not already present:

```
[automount]
enabled = true
options = "metadata"
mountFsTab = false
```

Reboot WSL, and you should be able to see your new Btrfs partition like any other Windows partition with a letter under `/mnt`, with full metadata passthrough.

### Copying the install

From this section, we'll assume that your VHD is mounted at `/mnt/arch`, your actual EFI partition is on drive letter `S:`, and your actual root partition at `E:`. Substitute these as required in your own setup.

Mount your actual EFI partition using `diskpart` in Windows, and copy the contents of the virtual EFI partition to it.

```
cp /mnt/arch/boot/* /mnt/s
```

Use `rsync` to clone the virtual root partition to the actual one, using the `-a` flag to preserve ownership and other attributes.

```bash
umount /mnt/arch/boot
rsync -ah /mnt/arch /mnt/e
```

This step will likely take a while, so feel free to let it run in the background.

> **Note**  
> You may get errors about not being able to copy some GPG-related files, but it seemed to work fine on my end either way — make of that what you will.

### Booting into UEFI shell

You can get builds of the UEFI shell from the EDK2 sources [here](https://github.com/pbatard/UEFI-Shell/releases/latest). Download the release ISO, open it in a program like NanaZip and copy `EFI\Boot\bootx64.efi` somewhere, then copy it under a different name to your EFI partition.

```powershell
# requires elevation
mkdir S:\EFI\Shell
Copy-Item path\to\shell\bootx64.efi S:\EFI\Shell\UefiShell.efi
```

Create the firmware boot entry for UEFI Shell as follows:

```
bcdedit /create  /d "UEFI Shell" /inherit "{bootmgr}"  # save the GUID you get from this
bcdedit /set "{your-guid}" path "\EFI\Shell\UefiShell.efi"
bcdedit /set "{fwbootmgr}" displayorder "{your-guid}" /addlast
```

You can now reboot into UEFI Shell to finally start booting into Arch.

### Booting into Arch for the first time

Congratulations! You have now technically installed Arch. You can now boot into it, but don't create a boot entry for it just yet — the initramfs has been built for WSL, and won't work out of the box on real hardware.

Start the kernel from the command-line as follows:

```sh
fs0: # or whatever your EFI partition is
vmlinuz-linux root=/dev/nvme0n1p3 rootfstype=btrfs initrd=\initramfs-linux-fallback.img
# i guessed my root partition's block device, feel free to use its GUID from the map command instead
```

This uses the fallback initramfs which contains more or less all the modules, ensuring that it'll work regardless of your system configuration. From here, you can now rebuild your initramfs, create an fstab, make an actual boot entry using `efibootmgr` or whatever else you prefer, and set up the rest of your system.
