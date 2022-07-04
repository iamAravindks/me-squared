
import bcrypt from "bcryptjs";
const mentors = [
  {
    name: "sumit kapoor",
    designation:
      "Senior Member of Technical Staff @ Oracle Cloud Infrastructure",
    yearNdClass: "3rd year cse",
    respondIn: "Usually responds in half a day ",
    about: `Sumit Kapoor is currently working as a Member of Technical Staff(IC-2) at Oracle Cloud where his day-to-day responsibilities are to work as a full-stack developer in oracle cloud. He has over 4 plus years of experience where he has worked on building products from scratch and has seen them scale from 1 user to a million users.
He is really passionate about teaching and loves mentoring individuals, With the experience of mentoring more than a dozen students and seeing them working at good places gives him immense joy. Apart from coding he loves reading fiction and traveling and clicking pictures.
You can connect with him-:
if you are looking to become a full-stack/front-end/back-end developer in less time frame with the right course structure He will be able to help you out in becoming one.

Currently helping mentees in react and nodejs express framework and helping them get better in building full-stack applications in 3-4 months time frame. Connect if you are someone who wants to learn react and nodejs in 3-4 months time frame.`,
    tags: [
      "react",
      "javascript",
      "algorithms",
      "front end developer",
      "mern",
      "nodejs",
    ],
    rating: 4,
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    watNum: 9745372810,
    email: "sumitkapoor@test.com",
    password: bcrypt.hashSync("123987",10),
  },
  {
    name: "jane doe",
    designation: "senior architect @Google.inc",
    yearNdClass: "3rd year cse",
    respondIn: "Usually responds in half a day ",
    about: `Jane doe is currently working as a senior architect @Google.inc .She helps peoples to direct into a better carrer in architect.
    she has an experience over 20 years in this field and mentored 1000+ students to achieve their goals in this area
      `,
    tags: ["designing", "architect", "CAD", "leadership"],
    rating: 4,
    socialLinks: [
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    watNum: 9745372810,
    email: "janedoe@test.com",
    password: bcrypt.hashSync("123987",10),
  },
  {
    name: "John Doe",
    designation: "SDA 3 @amazon.in",
    yearNdClass: "3rd year cse",
    respondIn: "Usually responds in half a day ",
    about: `John Doe is currently working as SDA 3 @amazon.in where his day-to-day responsibilities are to work as a full-stack developer in oracle cloud. He has over 4 plus years of experience where he has worked on building products from scratch and has seen them scale from 1 user to a million users.
He is really passionate about teaching and loves mentoring individuals, With the experience of mentoring more than a dozen students and seeing them working at good places gives him immense joy. Apart from coding he loves reading fiction and traveling and clicking pictures.
You can connect with him-:
if you are looking to become a full-stack/front-end/back-end developer in less time frame with the right course structure He will be able to help you out in becoming one.

Currently helping mentees in react and nodejs express framework and helping them get better in building full-stack applications in 3-4 months time frame. Connect if you are someone who wants to learn react and nodejs in 3-4 months time frame.`,
    tags: [
      "react",
      "javascript",
      "algorithms",
      "front end developer",
      "mern",
      "nodejs",
    ],
    rating: 4,
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    watNum: 9745372810,
    email: "johndoe@test.com",
    password: bcrypt.hashSync("123987",10),
  },
  {
    name: "Keerthi malik",
    designation: "Senior cloud enginner @Google Cloud Infrastructure",
    yearNdClass: "3rd year cse",

    respondIn: "Usually responds in half a day ",
    about: `Sumit Kapoor is currently working as Senior cloud enginner @Google Cloud Infrastructure where her day-to-day responsibilities are to work as a full-stack developer in oracle cloud. He has over 4 plus years of experience where he has worked on building products from scratch and has seen them scale from 1 user to a million users.
He is really passionate about teaching and loves mentoring individuals, With the experience of mentoring more than a dozen students and seeing them working at good places gives him immense joy. Apart from coding he loves reading fiction and traveling and clicking pictures.
You can connect with him-:
if you are looking to become a cloud enginner/developer in less time frame with the right course structure He will be able to help you out in becoming one.

Currently helping mentees in Gcloud,azure,aws`,
    tags: ["gcloud", "aws", "azure", "cloud computing"],
    rating: 4,
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    watNum: 9745372810,
    email: "keerthi013@test.com",
    password: bcrypt.hashSync("123987",10),
  },
];

const mentees = [
  {
    name: "Fig Nelson",
    email: "fignelson@test.com",
    password: bcrypt.hashSync("123abced",10),
    yearNdClass: "2nd year cse",
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    about: "want to get  a good grip in programming",
    skillLooksFor: "c++",
    watNum: 7771243000,
  },
  {
    name: "Emma watson",
    email: "emmawat@test.com",
    password: bcrypt.hashSync("12345abc",10),
    yearNdClass: "3nd year cse",
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    about:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?\nLorem ipsum dolor sit amet, consectetur adipisicing elit.",
    skillLooksFor: "python",
    watNum: 7771243000,
  },
  {
    name: "Elon Gated",
    email: "elongated@test.com",
    password: bcrypt.hashSync("123456",10),
    yearNdClass: "1st year eee",
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    about:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi \nLorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum ",
    skillLooksFor: "designing",
    watNum: 7771243000,
  },
  {
    name: "Sparrow bruid",
    email: "sparrowchirp@test.com",
    password: bcrypt.hashSync("123987",10),
    yearNdClass: "2nd year it",
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    about:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi \nLorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ",
    skillLooksFor: "js",
    watNum: 7771243000,
  },
  {
    name: "Thomas R. Toe",
    email: "rtoethomas@test.com",
    password: bcrypt.hashSync("123abc",10),
    yearNdClass: "2nd year ec",
    socialLinks: [
      { github: "https://github.com/iamAravindks/" },
      { twitter: "https://github.com/iamAravindks/" },
      { facebook: "https://github.com/iamAravindks/" },
      { instagram: "https://github.com/iamAravindks/" },
    ],
    about:
      "looks for good skill set in electronics,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi \n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil ",
    skillLooksFor: "pcb",
    watNum: 7771243000,
  },
];


export { mentors ,mentees};
