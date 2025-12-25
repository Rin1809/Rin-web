export type SourceItem = {
    id: string;
    name: string;
    type: 'folder' | 'file';
    parentId: string | null; // null means root
    size?: string;
    updatedAt?: string;
    link?: string; // Direct link to source.rins.space
};

export const sourceData: SourceItem[] = [
    // --- ROOT FOLDERS ---
    { id: 'adobe', name: 'Adobe Cracked Collection', type: 'folder', parentId: null, size: '25.8 GB', updatedAt: '2025-12-24' },
    { id: 'iso', name: 'OS Images (ISO)', type: 'folder', parentId: null, size: '42.21 GB', updatedAt: '2025-9-1' },
    { id: 'soft', name: 'Software & Tools', type: 'folder', parentId: null, size: '36.9 KB', updatedAt: '2025-11-22' },

    // --- ADOBE ---
    {
        id: 'qa',
        name: 'READ ME!!',
        type: 'file',
        parentId: 'adobe',
        size: '1 MB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Firewall%20App%20Blocker%201.9.zip'
    },
    {
        id: 'pts1',
        name: 'Adobe.Photoshop.2025.v26.10.0.7',
        type: 'file',
        parentId: 'adobe',
        size: '8 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.Photoshop.2025.v26.10.0.7.rar'
    },
    {
        id: 'pts2',
        name: 'Adobe Photoshop 2024 (v25.4.0.319) Multilingual',
        type: 'file',
        parentId: 'adobe',
        size: '4 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe%20Photoshop%202024%20(v25.4.0.319)%20Multilingual.zip'
    },
    {
        id: 'pr',
        name: 'Adobe Premiere Pro 2025 v25.4.0.99',
        type: 'file',
        parentId: 'adobe',
        size: '2 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.Premiere.Pro.2025.v25.4.0.99.rar'
    },
    {
        id: 'ae',
        name: 'Adobe After Effects 2025 v25.3.2.2',
        type: 'file',
        parentId: 'adobe',
        size: '4 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.After.Effects.2025.v25.3.2.2.rar'
    },
    {
        id: 'ai1',
        name: 'Adobe Illustrator 2023 v27.2.0.339',
        type: 'file',
        parentId: 'adobe',
        size: '3 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.Illustrator.2023.v27.2.0.339.zip'
    },

    {
        id: 'ai2',
        name: 'Adobe Illustrator 2025 v29.7.1',
        type: 'file',
        parentId: 'adobe',
        size: '4 GB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.Illustrator.2025.v29.7.1.rar'
    },
    {
        id: 'ame',
        name: 'Adobe Media Encoder 2025 v25.4.0.90',
        type: 'file',
        parentId: 'adobe',
        size: '900 MB',
        updatedAt: '23-12-2025',
        link: 'https://source.rins.space/Adobe/Adobe.Media.Encoder.2025.v25.4.0.90.rar'
    },
    // --- ISO ---
    {
        id: 'win-server-2019',
        name: 'Win Server 2019.iso',
        type: 'file',
        parentId: 'iso',
        size: '5.26 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/17763.3650.221105-1748.rs5_release_svc_refresh_SERVER_EVAL_x64FRE_en-us.iso'
    },
    {
        id: 'almalinux-9',
        name: 'AlmaLinux-9-latest-x86_64-Live-GNOME.iso',
        type: 'file',
        parentId: 'iso',
        size: '1.90 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/AlmaLinux-9-latest-x86_64-Live-GNOME.iso'
    },
    {
        id: 'centos-5-3-004',
        name: 'CentOS-5.3-i386-bin-DVD-004.iso',
        type: 'file',
        parentId: 'iso',
        size: '3.70 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/CentOS-5.3-i386-bin-DVD-004.iso'
    },
    {
        id: 'centos-5-3-005',
        name: 'CentOS-5.3-i386-bin-DVD-005.iso',
        type: 'file',
        parentId: 'iso',
        size: '3.70 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/CentOS-5.3-i386-bin-DVD-005.iso'
    },
    {
        id: 'fortigate-vm64',
        name: 'Fortigate_VM64-v7.0.1-build0157-FORTINET.zip',
        type: 'file',
        parentId: 'iso',
        size: '72.5 MB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/FGT_VM64-v7.0.1-build0157-FORTINET.zip'
    },
    {
        id: 'kali-2024',
        name: 'kali-linux-2024.1-installer-amd64.iso',
        type: 'file',
        parentId: 'iso',
        size: '3.82 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/kali-linux-2024.1-installer-amd64.iso'
    },
    {
        id: 'natutool-win10',
        name: 'NATUTOOL-Windows-10_Pro-64bit.iso',
        type: 'file',
        parentId: 'iso',
        size: '1.49 GB',
        updatedAt: '2025-12-16',
        link: 'https://source.rins.space/ISO/NATUTOOL-Windows-10_Pro-64bit.iso'
    },
    {
        id: 'netgate',
        name: 'netgate-installer-amd64.iso',
        type: 'file',
        parentId: 'iso',
        size: '446 MB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/netgate-installer-amd64.iso'
    },
    {
        id: 'pfsense',
        name: 'pfSense-CE-2.7.2-RELEASE-amd64.iso',
        type: 'file',
        parentId: 'iso',
        size: '834 MB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/pfSense-CE-2.7.2-RELEASE-amd64.iso'
    },
    {
        id: 'proxmox-bs',
        name: 'proxmox-backup-server_4.1-1.iso',
        type: 'file',
        parentId: 'iso',
        size: '1.41 GB',
        updatedAt: '2025-12-15',
        link: 'https://source.rins.space/ISO/proxmox-backup-server_4.1-1.iso'
    },
    {
        id: 'proxmox-dm',
        name: 'proxmox-datacenter-manager_1.0-2.iso',
        type: 'file',
        parentId: 'iso',
        size: '1.38 GB',
        updatedAt: '2025-12-15',
        link: 'https://source.rins.space/ISO/proxmox-datacenter-manager_1.0-2.iso'
    },
    {
        id: 'truenas',
        name: 'TrueNAS-13.0-U6.1.iso',
        type: 'file',
        parentId: 'iso',
        size: '0.98 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/TrueNAS-13.0-U6.1.iso'
    },
    {
        id: 'vmware-vcsa',
        name: 'VMware-VCSA-all-7.0.3-21477706.iso',
        type: 'file',
        parentId: 'iso',
        size: '8.36 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/VMware-VCSA-all-7.0.3-21477706.iso'
    },
    {
        id: 'vmware-esxi',
        name: 'VMware-VMvisor-Installer-7.0U3l.iso',
        type: 'file',
        parentId: 'iso',
        size: '382 MB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/VMware-VMvisor-Installer-7.0U3l.iso'
    },
    {
        id: 'win11-24h2',
        name: 'Win11_24H2_English_x64.iso',
        type: 'file',
        parentId: 'iso',
        size: '5.42 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/Win11_24H2_English_x64.iso'
    },
    {
        id: 'win7-pro',
        name: 'Windows7-pro-64bit.iso',
        type: 'file',
        parentId: 'iso',
        size: '3.09 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/ISO/Windows7-pro-64bit.iso'
    },

    // --- Soft---
    {
        id: 'active-win-all',
        name: 'Active windows (All).bat',
        type: 'file',
        parentId: 'soft',
        size: '9 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows (All).bat'
    },
    {
        id: 'active-win-7',
        name: 'Active windows 7.bat',
        type: 'file',
        parentId: 'soft',
        size: '2 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows 7.bat'
    },
    {
        id: 'active-win-8',
        name: 'Active windows 8.bat',
        type: 'file',
        parentId: 'soft',
        size: '4 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows 8.bat'
    },
    {
        id: 'active-win-10',
        name: 'Active windows 10.bat',
        type: 'file',
        parentId: 'soft',
        size: '3 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows 10.bat'
    },
    {
        id: 'active-win-11',
        name: 'Active windows 11.bat',
        type: 'file',
        parentId: 'soft',
        size: '4 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows 11.bat'
    },
    {
        id: 'active-win-xp',
        name: 'Active windows XP.bat',
        type: 'file',
        parentId: 'soft',
        size: '1 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/Active windows XP.bat'
    },
    {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        parentId: 'soft',
        size: '18 KB',
        updatedAt: '2025-5-23',
        link: 'https://source.rins.space/SOFT/README.md'
    }


];
