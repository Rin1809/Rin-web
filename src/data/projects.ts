export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    downloadUrl: string; // Duong dan tai file zip (hang nong)
    githubUrl: string;
    docsUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "AI Log Analyzer",
        description: "A Gemini AI-powered web application for log analysis, leveraging centralized logging systems (syslog) from diverse sources including Web Servers, Firewalls, SOC, and ELK stacks, .....",
        image: "/container.png",
        downloadUrl: "/project/AI-Log-Analyzer-main.zip",
        githubUrl: "https://github.com/Rin1809",
        docsUrl: "/posts/blog-3.md"
    },
    {
        id: 2,
        title: "Network - System Design",
        description: "Pre-configured network system templates and solutions featuring routing protocols, load balancing, trunking, VLANs, and Layer 2/3 switching, etc...., implemented in Cisco Packet Tracer.",
        image: "/container.png",
        downloadUrl: "/project/Cisco-Packet-Tracer-Network-Diagram-Design.zip",
        githubUrl: "https://github.com/Rin1809/Cisco_LAB",
        docsUrl: "#"
    },
    {
        id: 3,
        title: "Dos Tool",
        description: "A tool designed to simulate DoS attacks on websites, which can be scaled into a DDoS attack if executed concurrently across multiple machines.",
        image: "/container.png",
        downloadUrl: "/project/Dos_Tool.zip",
        githubUrl: "https://github.com/Rin1809/Dos_Tool",
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
