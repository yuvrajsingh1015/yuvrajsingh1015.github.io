export const profile = {
  name: "Yuvraj Singh",
  tagline:
    "Computer science student at Saarland University. I build software end to end, from web apps and AI tools to compilers and simulations.",
  email: "yuvrajsingh1015@gmail.com",
  github: "https://github.com/yuvrajsingh1015",
  linkedin: "https://www.linkedin.com/in/yuvraj-singh-613b87358/",
  cv: "/cv.pdf",
  role: "Software Developer",
  location: "Saarbrücken, DE",
  headline: ["Yuvraj", "Singh"],
};

export const about = {
  lead: "I enjoy turning ideas into working software, and understanding how it works under the hood.",
  text: [
    "I'm a computer science student at Saarland University with a minor in physics. My coursework spans software engineering, computer systems, networks and machine learning.",
    "I learn best by building. In team and solo projects I've designed, implemented and tested complete systems: a social network web app in Django, an AI assistant that searches entire codebases, a compiler for a subset of C, and a restaurant simulation built with a student team.",
    "Having worked in Java, Kotlin, C, Python and OCaml, I pick up new languages and tools quickly. I'm now looking for a working student position in software development or IT.",
  ],
  facts: [
    ["studying", "B.Sc. Computer Science"],
    ["university", "Saarland University"],
    ["progress", "138 / 180 CP"],
    ["based in", "Saarbrücken"],
    ["languages", "German C1 · English C1"],
  ],
};

export const skills = [
  {
    group: "Languages",
    items: [
      "Java",
      "Kotlin",
      "C",
      "Python",
      "Julia",
      "OCaml",
      "SQL",
      "MIPS Assembly",
    ],
  },
  {
    group: "Web & AI",
    items: ["Django", "Streamlit", "RAG", "Embeddings", "FAISS", "OpenAI API"],
  },
  {
    group: "Tools",
    items: [
      "Git",
      "GitLab",
      "Gradle",
      "Docker",
      "Vagrant",
      "VirtualBox",
      "Linux",
      "macOS",
    ],
  },
];

export const projects = [
  {
    title: "CodeRAG",
    description:
      "AI-powered code assistant that makes entire codebases searchable using retrieval-augmented generation, with a FAISS vector index and a Streamlit frontend.",
    tags: ["Python", "FAISS", "OpenAI API", "Streamlit"],
    github: null, // TODO: repo link
  },
  {
    title: "Saar la Carte",
    description:
      "Restaurant simulation built as a team in the Software Engineering Lab at Saarland University.",
    tags: ["Kotlin", "Gradle", "GitLab"],
    github: null, // TODO: your part, team size, link if public
  },
  {
    title: "TinyC Compiler",
    description:
      "Compiler for a subset of C: parser, abstract syntax tree, semantic analysis and code generation to MIPS assembly.",
    tags: ["Java", "MIPS"],
    github: null, // TODO
  },
  {
    title: "Fame",
    description:
      "Facebook-style social network web app with a Django backend and a relational data model.",
    tags: ["Django", "SQL", "HTML"],
    github: null, // TODO
  },
];
