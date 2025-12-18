export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    downloadUrl: string; // Path to zip file
    githubUrl: string;
    docsUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Tên Project 1",
        description: "A comprehensive guide to designing a secure small business network using FortiGate Firewall and Splunk.",
        image: "/container.png",
        downloadUrl: "#",
        githubUrl: "https://github.com/Rin1809",
        docsUrl: "#"
    },
    {
        id: 2,
        title: "Tên Project 2",
        description: "A comprehensive guide to designing a secure small business network using FortiGate Firewall and Splunk.",
        image: "/container.png",
        downloadUrl: "#",
        githubUrl: "https://github.com/Rin1809",
        docsUrl: "#"
    },
    {
        id: 3,
        title: "Tên Project 3",
        description: "A comprehensive guide to designing a secure small business network using FortiGate Firewall and Splunk.",
        image: "/container.png",
        downloadUrl: "#",
        githubUrl: "https://github.com/Rin1809",
        docsUrl: "#"
    },
    {
        id: 4,
        title: "Tên Project 4",
        description: "A comprehensive guide to designing a secure small business network using FortiGate Firewall and Splunk.",
        image: "/container.png",
        downloadUrl: "#",
        githubUrl: "https://github.com/Rin1809",
        docsUrl: "#"
    }
];
