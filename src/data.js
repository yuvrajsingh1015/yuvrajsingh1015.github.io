export const profile = {
  name: "Yuvraj Singh",
  tagline:
    "Computer science student at Saarland University, focused on embedded systems, software engineering and software architecture.",
  email: "yuvrajsingh1015@gmail.com",
  github: "https://github.com/yuvrajsingh1015",
  linkedin: "https://www.linkedin.com/in/yuvraj-singh-613b87358/",
  cv: "/cv.pdf",
};

export const about = {
  text: [
    "I'm a computer science student at Saarland University (138 of 180 credits completed) with a minor in physics.",
    "I learn best by building: through intensive project-based work I've designed, implemented and tested complete software systems, from a compiler to an AI-powered code assistant.",
    "I'm currently looking for a working student position in software development or IT.",
  ],
  focus: [
    {
      title: "Embedded Systems",
      text: "Courses in system architecture and embedded systems. I like understanding how software behaves close to the hardware.",
    },
    {
      title: "Software Engineering",
      text: "Team projects with Git, code reviews and automated testing, built to be maintainable.",
    },
    {
      title: "Software Architecture",
      text: "Structuring larger systems into clear components, from compiler phases to simulation design.",
    },
  ],
};

export const skills = [
  { group: "Languages", items: ["Java", "Kotlin", "C", "Python", "Julia", "OCaml", "SQL", "MIPS Assembly"] },
  { group: "Web & AI", items: ["Django", "Streamlit", "RAG", "Embeddings", "FAISS", "OpenAI API"] },
  { group: "Tools", items: ["Git", "GitLab", "Gradle", "Docker", "Vagrant", "VirtualBox", "Linux", "macOS"] },
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