const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedJobs = [
  {
    id: 'JOB-YEBLE-1',
    title: 'Recruitment Coordinator',
    company: 'Yeble Careers',
    sector: 'Staffing & Compliance',
    city: 'Dehradun',
    locationType: 'Hybrid',
    experience: '2-4 yrs',
    salaryRange: 'INR 4L - 6L',
    type: 'Full-time',
    openings: 2,
    status: 'Open',
    location: 'Dehradun, Uttarakhand',
    description: 'Coordinate candidate follow-up, shortlist tracking, and interview scheduling for regional hiring mandates.',
    salary: 'INR 4L - 6L',
    tags: ['recruitment', 'coordination', 'north india'],
  },
  {
    id: 'JOB-YEBLE-2',
    title: 'Client Success Associate',
    company: 'Yeble Careers',
    sector: 'Business Support & Coordination',
    city: 'Noida',
    locationType: 'Hybrid',
    experience: '1-3 yrs',
    salaryRange: 'INR 3.5L - 5L',
    type: 'Full-time',
    openings: 1,
    status: 'Interviewing',
    location: 'Noida, Uttar Pradesh',
    description: 'Support employer communication, mandate intake, and smooth handover across active hiring accounts.',
    salary: 'INR 3.5L - 5L',
    tags: ['client success', 'operations', 'coordination'],
  },
  {
    id: 'JOB-YEBLE-3',
    title: 'Field Hiring Executive',
    company: 'Yeble Careers',
    sector: 'Retail & Services',
    city: 'Chandigarh',
    locationType: 'On-site',
    experience: '2-5 yrs',
    salaryRange: 'INR 4L - 7L',
    type: 'Full-time',
    openings: 2,
    status: 'Open',
    location: 'Chandigarh, Punjab',
    description: 'Work on-ground with local employer teams, sourcing and screening for service and retail mandates.',
    salary: 'INR 4L - 7L',
    tags: ['field hiring', 'retail', 'services'],
  },
];

const seedContent = [
  {
    id: 'home-hero',
    title: 'Homepage Hero',
    body: 'Connecting innovative companies with the talent that drives excellence and growth.',
    mediaUrl: null,
  },
  {
    id: 'services-summary',
    title: 'Services Summary',
    body: 'Practical hiring support across sectors we can genuinely serve well.',
    mediaUrl: null,
  },
  {
    id: 'contact-summary',
    title: 'Contact Summary',
    body: 'Connect with our hiring desk for mandates, enquiries, and regional hiring coordination.',
    mediaUrl: null,
  },
];

async function main() {
  for (const job of seedJobs) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: job,
      create: job,
    });
  }

  for (const item of seedContent) {
    await prisma.siteContent.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed complete');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
