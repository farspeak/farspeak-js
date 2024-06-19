export type Project = {
  title: string;
  description: string;
  team_members: string[];
  priority: string;
  start_date: string;
};

export type Milestone = {
  title: string;
  description: string;
  owner: string;
  created_at?: string;
  due_date?: string;
  status?: string;
};

export const projectPhoenix: Project = {
  title: "Project Phoenix",
  description: "A complete revamp of our core product",
  team_members: ["John Doe", "Jane Doe", "Mike Smith"],
  priority: "High",
  start_date: "2023-12-01",
};

export const projectPegasus: Project = {
  title: "Project Pegasus",
  description: "A new mobile application for our services",
  team_members: ["Alice Jones", "Bob Brown", "Charlie Lee"],
  priority: "Medium",
  start_date: "2023-02-15",
};

export const milestonesPhoenix: Milestone[] = [
  {
    title: "Milestone 1: Design and Planning",
    description: "Define project requirements and create a development plan",
    created_at: "2023-01-01",
    due_date: "2023-01-31",
    owner: "John Doe",
    status: "Completed",
  },
  {
    title: "Milestone 2: Development",
    description: "Develop and implement core functionalities",
    created_at: "2023-02-01",
    due_date: "2023-02-28",
    owner: "Jane Doe",
    status: "In Progress",
  },
];

export const milestonesPegasus: Milestone[] = [
  {
    title: "Milestone 1: Prototype Development",
    description: "Develop a basic prototype to test core functionalities",
    created_at: "2023-03-01",
    due_date: "2023-03-15",
    owner: "Alice Jones",
    status: "Completed",
  },
  {
    title: "Milestone 2: UI/UX Design",
    description: "Design the user interface and user experience",
    created_at: "2023-03-15",
    owner: "Bob Brown",
  },
  {
    title: "Milestone 3: Beta Testing",
    description: "Conduct beta testing with a limited group of users",
    created_at: "2023-04-01",
    owner: "Charlie Lee",
  },
  {
    title: "Milestone 4: App Launch",
    description: "Release the app to the public",
    due_date: "2023-05-01",
    owner: "Charlie Lee",
  },
];

export type Smurf = {
  name: string;
  role: string;
  description: string;
};

export const smurfs: Smurf[] = [
  {
    name: "Papa Smurf",
    role: "Leader",
    description:
      "The wise and benevolent leader of the Smurfs. He has a long white beard and wears red pants and a red hat with a white trim.",
  },
  {
    name: "Smurfette",
    role: "Baker",
    description:
      "The only female Smurf in the village. She has blonde hair and wears a white dress with a blue skirt.",
  },
  {
    name: "Brainy Smurf",
    role: "Inventor",
    description:
      "The smartest Smurf in the village. He wears thick glasses and a white lab coat.",
  },
  {
    name: "Jokey Smurf",
    role: "Prankster",
    description:
      "The Smurf who loves to play pranks on others. He wears a purple hat with a yellow pom-pom and carries a box of exploding presents.",
  },
  {
    name: "Clumsy Smurf",
    role: "Baker's assistant",
    description:
      "The most accident-prone Smurf in the village. He wears a white baker's hat and is often covered in flour.",
  },
];
