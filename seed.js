const mongoose = require('mongoose');
const Service = require('./models/Service');
const config = require('./config');

// Sample data. Names are made up for practice, except the real national helplines.
const sampleServices = [
  { name: 'City General Hospital (Sample)', category: 'Hospital', city: 'Bengaluru',
    address: 'MG Road', phone: '080-0000-0001', description: 'Emergency, OPD and free medicines. Ramps and lifts available.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Everyone'],
    languages: ['English', 'Kannada', 'Hindi'], lastVerified: new Date('2026-10-20') },
  { name: 'Community Health Centre (Sample)', category: 'Hospital', city: 'Mysuru',
    address: 'Main Road', phone: '0821-000-0002', description: 'Basic treatment, vaccination and maternity care.',
    wheelchairAccessible: false, isFree: true, eligibility: ['Everyone'],
    languages: ['Kannada', 'English'], lastVerified: new Date('2026-09-15') },
  { name: 'Fair Price Ration Shop, Ward 12 (Sample)', category: 'Ration Shop', city: 'Bengaluru',
    address: 'Ward 12 Market', phone: '080-0000-0003', description: 'Subsidised rice, wheat and sugar for ration card holders.',
    wheelchairAccessible: false, isFree: false, eligibility: ['BPL', 'Senior Citizen'],
    languages: ['Kannada'], lastVerified: new Date('2026-08-10') },
  { name: 'Taluk Office (Sample)', category: 'Government Office', city: 'Mysuru',
    address: 'Taluk Office Road', phone: '0821-000-0004', description: 'Certificates, land records and pension forms.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Everyone'],
    languages: ['Kannada', 'English'], lastVerified: new Date('2026-10-01') },
  { name: 'Government Higher Primary School (Sample)', category: 'School', city: 'Mangaluru',
    address: 'School Lane', phone: '0824-000-0005', description: 'Free education, mid-day meals and free books.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Everyone'],
    languages: ['Kannada', 'English'], lastVerified: new Date('2026-07-05') },
  { name: 'Government School for Hearing and Visually Impaired (Sample)', category: 'School', city: 'Bengaluru',
    address: 'Park Street', phone: '080-0000-0006', description: 'Special teachers, sign language and braille support.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Disability'],
    languages: ['English', 'Kannada', 'Hindi'], lastVerified: new Date('2026-10-28') },
  { name: 'Elderline (National Helpline for Senior Citizens)', category: 'Helpline', city: 'Nationwide',
    address: 'Phone service', phone: '14567', description: 'Advice and support for senior citizens by phone.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Senior Citizen'],
    languages: ['Hindi', 'English'], lastVerified: new Date('2026-06-01') },
  { name: 'Women Helpline', category: 'Helpline', city: 'Nationwide',
    address: 'Phone service', phone: '181', description: 'Help for women facing violence or harassment.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Women'],
    languages: ['Hindi', 'English', 'Kannada'], lastVerified: new Date('2026-06-01') },
  { name: 'Emergency Response Helpline', category: 'Helpline', city: 'Nationwide',
    address: 'Phone service', phone: '112', description: 'Police, fire and ambulance in one number.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Everyone'],
    languages: ['Hindi', 'English', 'Kannada'], lastVerified: new Date('2026-06-01') },
  { name: 'District Disability Welfare Office (Sample)', category: 'Government Office', city: 'Mangaluru',
    address: 'District Office Complex', phone: '0824-000-0010', description: 'Disability certificates, pension and assistive device schemes.',
    wheelchairAccessible: true, isFree: true, eligibility: ['Disability', 'BPL'],
    languages: ['Kannada', 'English'], lastVerified: new Date('2025-12-01') }
];

// Clears old data and inserts the samples
async function seedDatabase() {
  await mongoose.connect(config.MONGO_URL);
  await Service.deleteMany({});
  await Service.insertMany(sampleServices);
  console.log('Added ' + sampleServices.length + ' sample services');
  await mongoose.disconnect();
}

seedDatabase();
