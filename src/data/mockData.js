export const LAB_INFO = {
  name: "Intelligent Networks Laboratory",
  shortName: "Intelligent Networks Laboratory",
  department: "Department of Computer Science & Engineering",
  university: "Institute of Advanced Engineering & Technology",
  tagline: "Research in Intelligent Wireless Networks, Programmable Data Planes, and Quantum Communication",
  description: "The Intelligent Networks Laboratory conducts fundamental and applied research in 6G systems, software-defined networking (SDN), network security, and quantum communications.",
  location: "Computer Science Building, Room 402",
  address: "100 University Parkway, Campus Box 104",
  email: "contact@intelligent-networks-lab.org",
  phone: "+1 (555) 019-2834",
  socials: {
    github: "https://github.com",
    scholar: "https://scholar.google.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  stats: [
    { label: "Citations", value: "5,400+", icon: "TrendingUp" },
    { label: "Publications", value: "135+", icon: "BookOpen" },
    { label: "Active Grants", value: "$6.8M", icon: "Award" },
    { label: "Alumni Placements", value: "100%", icon: "GraduationCap" },
  ]
};

export const MOCK_PROJECTS = [
  {
    $id: "proj-1",
    title: "6G Open-RAN Dynamic Resource Orchestrator",
    category: "6G & Wireless",
    status: "Active",
    lead: "Dr. Alex Vance",
    description: "Developing dynamic slice allocation algorithms for Open-RAN architectures operating under sub-millisecond latency constraints.",
    tags: ["6G", "O-RAN", "Edge Computing"],
    featured: true,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    startDate: "2024-01",
    sponsor: "National Science Foundation (NSF)"
  },
  {
    $id: "proj-2",
    title: "Kernel-Level Real-Time Telemetry with eBPF",
    category: "Network Security",
    status: "Active",
    lead: "Elena Rostova",
    description: "In-kernel packet inspection and threat isolation using eBPF probes with low CPU overhead.",
    tags: ["Security", "eBPF", "Linux Kernel"],
    featured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    startDate: "2023-09",
    sponsor: "DARPA Cyber Systems"
  },
  {
    $id: "proj-3",
    title: "Quantum Mesh Protocol for Optical Backbone Networks",
    category: "Quantum Networks",
    status: "Active",
    lead: "Dr. Marcus Thorne",
    description: "Entanglement routing protocols and quantum key distribution (QKD) management over hybrid optical testbeds.",
    tags: ["Quantum", "Optical Networks", "QKD"],
    featured: true,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    startDate: "2024-03",
    sponsor: "Department of Energy (DoE)"
  },
  {
    $id: "proj-4",
    title: "Reinforcement Learning for Programmable Data Plane Routing",
    category: "SDN & Routing",
    status: "Active",
    lead: "David Chen",
    description: "WAN routing algorithms that dynamically adapt link weights during sudden fiber cuts and traffic surges.",
    tags: ["SDN", "P4", "Traffic Engineering"],
    featured: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    startDate: "2023-05",
    sponsor: "Cisco Research"
  },
  {
    $id: "proj-5",
    title: "Satellite-Terrestrial Integrated Network Handover Protocols",
    category: "Satellite Networks",
    status: "Active",
    lead: "Siddharth Rao",
    description: "Handover protocols connecting Low Earth Orbit (LEO) satellite constellations with terrestrial wireless cells.",
    tags: ["LEO Satellites", "Wireless", "STIN"],
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    startDate: "2023-11",
    sponsor: "Space Research Grant"
  }
];

export const MOCK_PUBLICATIONS = [
  {
    $id: "pub-1",
    title: "O-RAN Elasticity: Deep Reinforcement Learning for Millisecond Slicing in 6G Networks",
    authors: ["Alex Vance", "Elena Rostova", "Marcus Thorne"],
    venue: "IEEE INFOCOM 2025",
    year: 2025,
    type: "Conference",
    doi: "10.1109/INFOCOM.2025.10923",
    pdfUrl: "https://arxiv.org",
    bibtex: `@inproceedings{vance2025oran,\n  title={O-RAN Elasticity: Deep Reinforcement Learning for Millisecond Slicing in 6G Networks},\n  author={Vance, Alex and Rostova, Elena and Thorne, Marcus},\n  booktitle={IEEE INFOCOM 2025},\n  pages={1--10},\n  year={2025}\n}`,
    abstract: "Open Radio Access Network (O-RAN) architectures require real-time dynamic slicing to meet stringent Quality of Service (QoS) guarantees for mission-critical 6G applications.",
    tags: ["6G", "O-RAN", "Deep RL"],
    featured: true
  },
  {
    $id: "pub-2",
    title: "eBPF-Shield: Kernel-Level Sub-Microsecond Network Threat Isolation",
    authors: ["Elena Rostova", "David Chen", "Alex Vance"],
    venue: "USENIX Security Symposium 2024",
    year: 2024,
    type: "Conference",
    doi: "10.5555/3627192.3627195",
    pdfUrl: "https://arxiv.org",
    bibtex: `@inproceedings{rostova2024ebpf,\n  title={eBPF-Shield: Kernel-Level Sub-Microsecond Network Threat Isolation},\n  author={Rostova, Elena and Chen, David and Vance, Alex},\n  booktitle={33rd USENIX Security Symposium},\n  pages={145--162},\n  year={2024}\n}`,
    abstract: "Modern cloud-native workloads face microsecond-scale DDoS and side-channel telemetry exploits. We introduce eBPF-Shield, an in-kernel programmable packet filter that analyzes socket anomalies in XDP driver mode.",
    tags: ["Security", "eBPF", "Kernel"],
    featured: true
  },
  {
    $id: "pub-3",
    title: "Entanglement Routing Protocols in Multi-Hop Quantum Optical Mesh Networks",
    authors: ["Marcus Thorne", "Siddharth Rao", "Alex Vance"],
    venue: "ACM SIGCOMM 2024",
    year: 2024,
    type: "Conference",
    doi: "10.1145/3651890.3651902",
    pdfUrl: "https://arxiv.org",
    bibtex: `@inproceedings{thorne2024quantum,\n  title={Entanglement Routing Protocols in Multi-Hop Quantum Optical Mesh Networks},\n  author={Thorne, Marcus and Rao, Siddharth and Vance, Alex},\n  booktitle={ACM SIGCOMM 2024},\n  pages={89--104},\n  year={2024}\n}`,
    abstract: "Quantum key distribution across wide-area networks requires scalable entanglement distribution without intermediate quantum repeaters causing decoherence.",
    tags: ["Quantum", "SIGCOMM", "Optical"],
    featured: true
  },
  {
    $id: "pub-4",
    title: "P4-TE: Programmable Data Plane Traffic Engineering with Bounded Delay",
    authors: ["David Chen", "Maya Lin", "Alex Vance"],
    venue: "IEEE/ACM Transactions on Networking",
    year: 2024,
    type: "Journal",
    doi: "10.1109/TNET.2024.339102",
    pdfUrl: "https://arxiv.org",
    bibtex: `@article{chen2024p4te,\n  title={P4-TE: Programmable Data Plane Traffic Engineering with Bounded Delay},\n  author={Chen, David and Lin, Maya and Vance, Alex},\n  journal={IEEE/ACM Transactions on Networking},\n  volume={32},\n  pages={2810--2825},\n  year={2024}\n}`,
    abstract: "Software-defined WANs demand deterministic throughput guarantees. By offloading traffic engineering decisions directly into P4-enabled switch hardware, P4-TE achieves fast rerouting.",
    tags: ["SDN", "P4", "IEEE ToN"],
    featured: false
  }
];

export const MOCK_PEOPLE = [
  {
    $id: "person-1",
    name: "Dr. Alex Vance",
    role: "Professor & Director",
    category: "Faculty",
    title: "Professor of Computer Science & Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Dr. Vance leads the Intelligent Networks Laboratory. His research focuses on 6G Open-RAN architecture, zero-trust network telemetry, and quantum routing protocols across hybrid optical testbeds.",
    researchInterests: ["6G Architecture", "SDN/NFV", "Network Security", "Quantum Networks"],
    scholar: "https://scholar.google.com",
    github: "https://github.com",
    email: "alex.vance@intelligent-networks-lab.org",
    office: "CS Building R402A"
  },
  {
    $id: "person-2",
    name: "Dr. Marcus Thorne",
    role: "Postdoctoral Fellow",
    category: "Postdocs",
    title: "Postdoctoral Researcher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Ph.D. from ETH Zurich. Marcus conducts research on quantum entanglement routing algorithms and optical fiber entanglement distribution over metropolitan mesh lines.",
    researchInterests: ["Quantum Key Distribution", "Optical Networks", "Photonic Switches"],
    scholar: "https://scholar.google.com",
    github: "https://github.com",
    email: "marcus.thorne@intelligent-networks-lab.org",
    office: "CS Building R402B"
  },
  {
    $id: "person-3",
    name: "Elena Rostova",
    role: "Ph.D. Candidate",
    category: "PhD Students",
    title: "4th Year Ph.D. Student",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Elena's doctoral research focuses on eBPF kernel telemetry, sub-microsecond threat isolation, and high-performance Linux network stack optimizations.",
    researchInterests: ["eBPF", "Linux Kernel", "Network Security"],
    scholar: "https://scholar.google.com",
    github: "https://github.com",
    email: "elena.r@intelligent-networks-lab.org",
    office: "CS Building R404"
  },
  {
    $id: "person-4",
    name: "David Chen",
    role: "Ph.D. Candidate",
    category: "PhD Students",
    title: "3rd Year Ph.D. Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "David works on P4 programmable switches, hardware-offloaded traffic engineering, and deep reinforcement learning for dynamic WAN path selection.",
    researchInterests: ["P4 Data Plane", "Reinforcement Learning", "Traffic Engineering"],
    scholar: "https://scholar.google.com",
    github: "https://github.com",
    email: "david.c@intelligent-networks-lab.org",
    office: "CS Building R404"
  },
  {
    $id: "person-5",
    name: "Dr. Maya Lin",
    role: "Alumni (Ph.D. 2024)",
    category: "Alumni",
    title: "Research Scientist at Google Research",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Dissertation on Edge Computing Acceleration & Federated Learning. Currently a Research Scientist at Google Research.",
    researchInterests: ["Edge Computing", "Federated Learning"],
    scholar: "https://scholar.google.com",
    github: "https://github.com",
    email: "alumni@intelligent-networks-lab.org",
    office: "Google Research"
  }
];

export const MOCK_NEWS = [
  {
    $id: "news-1",
    title: "Awarded $2.4M NSF Grant for Open-RAN 6G Research",
    date: "2025-06-15",
    category: "Grant",
    summary: "The National Science Foundation has awarded a 3-year research grant to investigate real-time sub-millisecond AI slicing in 6G open networks.",
    content: "The Intelligent Networks Laboratory has received a new 3-year grant from the NSF's Resilient Infrastructure program. The project will investigate real-time slicing algorithms operating under strict latency constraints in Open-RAN multi-tenant cellular deployments."
  },
  {
    $id: "news-2",
    title: "Paper Accepted at USENIX Security 2024",
    date: "2024-11-02",
    category: "Publication",
    summary: "Elena Rostova's paper on kernel-level eBPF threat isolation has been accepted at the 33rd USENIX Security Symposium.",
    content: "Our paper 'eBPF-Shield: Kernel-Level Sub-Microsecond Network Threat Isolation' has been accepted for presentation at USENIX Security 2024 in Anaheim. The work demonstrates sub-microsecond threat mitigation directly in Linux driver mode."
  },
  {
    $id: "news-3",
    title: "Hosting Regional Software-Defined Networking Workshop",
    date: "2024-08-20",
    category: "Event",
    summary: "Over 100 researchers gather for technical presentations on programmable data planes and cloud edge networks.",
    content: "The Intelligent Networks Laboratory hosted a regional SDN workshop featuring technical talks from industry and academic leaders on P4 data plane programming, eBPF telemetry, and optical network orchestration."
  }
];
