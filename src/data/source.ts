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
    { id: 'adobe', name: 'Adobe Collection', type: 'folder', parentId: null, size: '--', updatedAt: '2025-12-24' },
    { id: 'iso', name: 'OS Images (ISO)', type: 'folder', parentId: null, size: '--', updatedAt: '2025-9-1' },
    { id: 'soft', name: 'Software & Tools', type: 'folder', parentId: null, size: '--', updatedAt: '2025-11-22' },
    { id: 'web-security', name: 'Web Security', type: 'folder', parentId: null, size: '--', updatedAt: '2025-7-12' },

    // --- ADOBE ---
    {
        id: 'pts',
        name: 'Adobe Photoshop 2025.zip',
        type: 'file',
        parentId: 'adobe',
        size: '4.5 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/Adobe/Adobe%20Photoshop%202025.zip'
    },
    {
        id: 'pr',
        name: 'Adobe Premiere Pro 2025.zip',
        type: 'file',
        parentId: 'adobe',
        size: '10.2 GB',
        updatedAt: '2025-12-24',
        link: 'https://source.rins.space/Adobe/Adobe%20Premiere%20Pro%202025.zip'
    },

    // --- ISO ---
    {
        id: 'win11',
        name: 'Windows 11 Pro 23H2.iso',
        type: 'file',
        parentId: 'iso',
        size: '6.2 GB',
        updatedAt: '2025-9-1',
        link: 'https://source.rins.space/ISO/Windows11_23H2.iso'
    },
    {
        id: 'ubuntu',
        name: 'Ubuntu 24.04 LTS.iso',
        type: 'file',
        parentId: 'iso',
        size: '4.7 GB',
        updatedAt: '2025-9-1',
        link: 'https://source.rins.space/ISO/ubuntu-24.04-desktop-amd64.iso'
    },
];
