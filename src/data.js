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
    ["based in", "Saarbrücken"],
    ["languages", "German C1 · English C1"],
  ],
};

// evidence: where each skill was used; names matching a project title link to its card
export const skills = [
  {
    group: "languages",
    items: [
      {
        name: "Java",
        evidence: ["TinyC Compiler", "university programming projects"],
      },
      {
        name: "Rust",
        evidence: ["concurrency course project (train network simulation)"],
      },
      { name: "Kotlin", evidence: ["Saar la Carte"] },
      { name: "Python", evidence: ["CodeRAG", "Fame"] },
      { name: "C", evidence: ["systems programming projects at university"] },
      { name: "SQL", evidence: ["Fame", "Big Data Engineering course"] },
      { name: "JavaScript", evidence: ["this website"] },
      {
        name: "TypeScript",
        evidence: ["Fine Print (contract clause highlighter, in progress)"],
      },
    ],
  },
  {
    group: "web",
    items: [
      { name: "React", evidence: ["this website"] },
      { name: "Tailwind CSS", evidence: ["this website"] },
      { name: "Streamlit", evidence: ["CodeRAG"] },
      { name: "Django + REST Framework", evidence: ["Fame"] },
    ],
  },
  {
    group: "tools",
    items: [
      { name: "Git", evidence: ["every project"] },
      {
        name: "GitLab CI",
        evidence: ["Saar la Carte", "Rust concurrency project"],
      },
      { name: "GitHub Actions", evidence: ["this website's deployment"] },
      { name: "JUnit", evidence: ["Saar la Carte"] },
      { name: "Mockito", evidence: ["Saar la Carte"] },
      { name: "detekt", evidence: ["Saar la Carte"] },
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

// anchor id of a project card, e.g. "project-saar-la-carte"
export function projectId(title) {
  return `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
