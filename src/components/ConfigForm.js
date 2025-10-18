import React, { useState } from 'react';
import { 
  ArrowLeft, Send, Github, Layers, Check, Zap, HardHat,
  MapPin, Globe, Twitter, Award, GraduationCap, BookOpen,
  Briefcase, Rocket, Certificate, MessageSquare, Users
} from 'lucide-react';
import InputField from './Form/InputField';
import SectionCard from './Form/SectionCard';

const ConfigForm = ({ data, setData, setView }) => {
  const [formData, setFormData] = useState(data);
  const MAX_IMAGE_BYTES = 250 * 1024; // 250 KB
  const MAX_CV_BYTES = 2 * 1024 * 1024; // 2 MB

  const handlePersonalChange = (e) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, [e.target.name]: e.target.value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_BYTES) {
        alert(`Profile image is too large. Please select an image smaller than ${Math.round(MAX_IMAGE_BYTES / 1024)} KB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, personal: { ...formData.personal, profileImage: reader.result } });
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > MAX_CV_BYTES) {
        alert(`CV file is too large. Please select a file smaller than ${Math.round(MAX_CV_BYTES / 1024)} KB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, personal: { ...formData.personal, cvFile: reader.result, cvFileName: file.name, cvFileSize: file.size } });
      reader.readAsDataURL(file);
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleExperienceChange = (index, e) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, experience: newExp });
  };

  const addExperience = () => {
    const newId = Math.max(0, ...formData.experience.map((ex) => ex.id)) + 1;
    setFormData({ ...formData, experience: [...formData.experience, { id: newId, year: '', title: '', company: '', description: '' }] });
  };

  const removeExperience = (id) => setFormData({ ...formData, experience: formData.experience.filter((e) => e.id !== id) });

  const handleProjectChange = (index, e) => {
    const newProjs = [...formData.projects];
    newProjs[index] = { ...newProjs[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, projects: newProjs });
  };

  const addProject = () => {
    const newId = Math.max(0, ...formData.projects.map((p) => p.id)) + 1;
    setFormData({ ...formData, projects: [...formData.projects, { id: newId, title: '', description: '' }] });
  };

  const removeProject = (id) => setFormData({ ...formData, projects: formData.projects.filter((p) => p.id !== id) });

  const handleAutoFillFromCV = () => {
    if (!formData.personal.cvFile) return alert('Please upload a CV file (PDF/DOCX) first to simulate auto-fill.');

    const mockCVData = {
      fullName: 'Alex K. Developer',
      title: 'Full Stack Engineer & Cloud Specialist',
      tagline: 'Delivering end-to-end solutions, from high-performance UIs to scalable cloud infrastructure.',
      about: 'MOCK PARSING SUCCESS! Bio extracted from CV: Alex is a certified AWS DevOps professional with 5 years of experience.',
      email: 'alex.developer@mock.com',
      github: 'https://github.com/alex-dev-mock',
      linkedin: 'https://linkedin.com/in/alex-k-dev',
    };

    const mockExperience = [
      { id: 1, year: '2020 - Present', title: 'DevOps Engineer', company: 'Global Tech', description: 'Automated infra provisioning using Terraform.' },
      { id: 2, year: '2018 - 2020', title: 'Junior Software Developer', company: 'Startup X', description: 'Contributed to the frontend using React.' },
    ];

    const mockSkills = ['TypeScript', 'React', 'Node.js', 'Terraform', 'AWS Lambda', 'Docker', 'Kubernetes'];

    setFormData({ ...formData, personal: { ...formData.personal, ...mockCVData, profileImage: 'https://placehold.co/128x128/f97316/ffffff?text=AD' }, experience: mockExperience, skills: mockSkills });
    alert('Form successfully auto-filled (mock).');
  };

  const handleSubmit = (e) => { e.preventDefault(); setData(formData); setView('preview'); };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-blue-200">
        <h2 className="text-3xl font-extrabold text-gray-800">Fill Your Template Data</h2>
        <button onClick={() => setView('welcome')} className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150 font-medium">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back to Templates
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-2xl shadow-inner border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center"><Zap className="w-6 h-6 mr-2" /> Resume Upload & Quick-Fill</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CV/Resume File (PDF/DOCX)</label>
              <input type="file" accept=".pdf,.docx" onChange={handleCVUpload} className="w-full p-3 border border-gray-300 rounded-lg" />
              {formData.personal.cvFileName && <p className="mt-2 text-sm text-green-600 flex items-center"><Check className="w-4 h-4 mr-1" /> {formData.personal.cvFileName}</p>}
            </div>
            <div className="mt-7">
              <button type="button" onClick={handleAutoFillFromCV} className="w-full py-3 bg-orange-500 text-white rounded-lg"><HardHat className="w-5 h-5 mr-2 inline" /> Auto-Fill Data from CV</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">1. Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField 
              label="Full Name" 
              name="fullName" 
              value={formData.personal.fullName} 
              onChange={handlePersonalChange} 
              required 
              hint="Your professional name as you'd like it to appear"
            />
            <InputField 
              label="Job Title/Role" 
              name="title" 
              value={formData.personal.title} 
              onChange={handlePersonalChange} 
              required 
              hint="Current or desired position"
            />
          </div>
          <InputField 
            label="Professional Tagline" 
            name="tagline" 
            value={formData.personal.tagline} 
            onChange={handlePersonalChange}
            hint="A brief, impactful statement about your professional focus"
          />
          <InputField 
            label="About Me" 
            name="about" 
            value={formData.personal.about} 
            onChange={handlePersonalChange} 
            rows={6} 
            required
            hint="Support markdown formatting. Include key highlights and career focus"
          />
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField 
              label="Email" 
              name="email" 
              type="email" 
              value={formData.personal.email} 
              onChange={handlePersonalChange} 
              icon={Send} 
              required 
              hint="Professional email address"
            />
            <InputField 
              label="Phone" 
              name="phone" 
              type="tel" 
              value={formData.personal.phone} 
              onChange={handlePersonalChange}
              hint="Include country code for international"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField 
              label="Location" 
              name="location" 
              value={formData.personal.location} 
              onChange={handlePersonalChange} 
              icon={MapPin}
              hint="City, Country or 'Remote'"
            />
            <InputField 
              label="Availability" 
              name="availability" 
              value={formData.personal.availability} 
              onChange={handlePersonalChange}
              icon={Users}
              hint="e.g., 'Open to opportunities', 'Available for freelance'"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField 
              label="Personal Website" 
              name="website" 
              value={formData.personal.website} 
              onChange={handlePersonalChange} 
              icon={Globe}
              hint="Your portfolio or blog URL"
            />
            <InputField 
              label="Twitter/X" 
              name="twitter" 
              value={formData.personal.twitter} 
              onChange={handlePersonalChange} 
              icon={Twitter}
              hint="Your professional Twitter profile URL"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField 
              label="GitHub URL" 
              name="github" 
              value={formData.personal.github} 
              onChange={handlePersonalChange} 
              icon={Github}
              hint="Share your code contributions"
            />
            <InputField 
              label="LinkedIn URL" 
              name="linkedin" 
              value={formData.personal.linkedin} 
              onChange={handlePersonalChange} 
              icon={Layers}
              hint="Your professional network profile"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (PNG/JPEG)</label>
            <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} className="w-full p-3 border border-gray-300 rounded-lg" />
            {formData.personal.profileImage && <img src={formData.personal.profileImage} alt="Profile Preview" className="w-20 h-20 rounded-full mt-3 object-cover" />}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
            <div className="flex items-center">
              <GraduationCap className="w-6 h-6 mr-2" />
              2. Education
            </div>
          </h3>
          {formData.education.map((edu, index) => (
            <SectionCard 
              key={edu.id} 
              title={`Education #${index + 1}`} 
              onRemove={() => handleEducationRemove(edu.id)}
            >
              <div className="grid md:grid-cols-2 gap-x-6">
                <InputField 
                  label="Degree/Certification" 
                  name="degree" 
                  value={edu.degree} 
                  onChange={(e) => handleEducationChange(index, e)}
                  hint="Full name of your degree"
                />
                <InputField 
                  label="Institution" 
                  name="institution" 
                  value={edu.institution} 
                  onChange={(e) => handleEducationChange(index, e)}
                  hint="University or institution name"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-x-6">
                <InputField 
                  label="Year/Period" 
                  name="year" 
                  value={edu.year} 
                  onChange={(e) => handleEducationChange(index, e)}
                  hint="e.g., '2018 - 2022' or '2023'"
                />
                <InputField 
                  label="Highlights" 
                  name="highlights" 
                  value={edu.highlights} 
                  onChange={(e) => handleEducationChange(index, e)}
                  hint="Notable achievements, specializations"
                />
              </div>
            </SectionCard>
          ))}
          <button 
            type="button" 
            onClick={handleAddEducation}
            className="w-full py-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
          >
            + Add Education
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
            <div className="flex items-center">
              <Certificate className="w-6 h-6 mr-2" />
              3. Skills & Certifications
            </div>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Technical Skills</label>
              <InputField 
                label="Core Technical Skills" 
                name="technical" 
                value={formData.skills.technical.join(', ')} 
                onChange={handleTechnicalSkillsChange} 
                rows={2}
                hint="Separate skills with commas. List most important first."
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.technical.map((skill) => (
                  <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Soft Skills</label>
              <InputField 
                label="Professional Skills" 
                name="soft" 
                value={formData.skills.soft.join(', ')} 
                onChange={handleSoftSkillsChange} 
                rows={2}
                hint="Leadership, communication, and other professional skills"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.soft.map((skill) => (
                  <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Certifications</label>
              {formData.skills.certifications.map((cert, index) => (
                <SectionCard 
                  key={index} 
                  title={`Certification #${index + 1}`}
                  onRemove={() => handleCertificationRemove(index)}
                >
                  <div className="grid md:grid-cols-2 gap-x-6">
                    <InputField 
                      label="Certificate Name" 
                      name="name" 
                      value={cert.name} 
                      onChange={(e) => handleCertificationChange(index, e)}
                      hint="Official certification title"
                    />
                    <InputField 
                      label="Issuing Organization" 
                      name="issuer" 
                      value={cert.issuer} 
                      onChange={(e) => handleCertificationChange(index, e)}
                      hint="Organization that issued the certification"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-6">
                    <InputField 
                      label="Year Obtained" 
                      name="year" 
                      value={cert.year} 
                      onChange={(e) => handleCertificationChange(index, e)}
                      hint="Year of certification"
                    />
                    <InputField 
                      label="Expiration Year" 
                      name="expires" 
                      value={cert.expires} 
                      onChange={(e) => handleCertificationChange(index, e)}
                      hint="Leave blank if no expiration"
                    />
                  </div>
                </SectionCard>
              ))}
              <button 
                type="button" 
                onClick={handleAddCertification}
                className="w-full py-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
              >
                + Add Certification
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              4. Work Experience
            </div>
          </h3>
          {formData.experience.map((exp, index) => (
            <SectionCard key={exp.id} title={`Job #${index + 1}`} onRemove={() => removeExperience(exp.id)}>
              <div className="grid md:grid-cols-2 gap-x-6">
                <InputField 
                  label="Job Title" 
                  name="title" 
                  value={exp.title} 
                  onChange={(e) => handleExperienceChange(index, e)}
                  hint="Your role or position title"
                  required
                />
                <InputField 
                  label="Company" 
                  name="company" 
                  value={exp.company} 
                  onChange={(e) => handleExperienceChange(index, e)}
                  hint="Company or organization name"
                  required
                />
              </div>
              <div className="grid md:grid-cols-3 gap-x-6">
                <InputField 
                  label="Duration" 
                  name="year" 
                  value={exp.year} 
                  onChange={(e) => handleExperienceChange(index, e)}
                  hint="e.g., '2020 - Present'"
                  required
                />
                <InputField 
                  label="Location" 
                  name="location" 
                  value={exp.location} 
                  onChange={(e) => handleExperienceChange(index, e)}
                  hint="City, Country or 'Remote'"
                />
                <InputField 
                  label="Employment Type" 
                  name="type" 
                  value={exp.type} 
                  onChange={(e) => handleExperienceChange(index, e)}
                  hint="Full-time, Contract, etc."
                />
              </div>
              <InputField 
                label="Overview" 
                name="description" 
                value={exp.description} 
                onChange={(e) => handleExperienceChange(index, e)} 
                rows={2}
                hint="Brief overview of your role and responsibilities"
                required
              />
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                {exp.achievements?.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start space-x-2">
                    <InputField
                      name={`achievements.${achIndex}`}
                      value={achievement}
                      onChange={(e) => handleExperienceAchievementChange(index, achIndex, e)}
                      hint="Start with strong action verbs"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeExperienceAchievement(index, achIndex)}
                      className="mt-1 p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addExperienceAchievement(index)}
                  className="w-full py-2 border-2 border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50"
                >
                  + Add Achievement
                </button>
              </div>
              <InputField 
                label="Technologies Used" 
                name="technologies" 
                value={exp.technologies?.join(', ')} 
                onChange={(e) => handleExperienceTechnologiesChange(index, e)}
                hint="Comma-separated list of key technologies"
              />
            </SectionCard>
          ))}
          <button 
            type="button" 
            onClick={addExperience} 
            className="w-full py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            + Add Work Experience
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">4. Key Projects</h3>
          {formData.projects.map((proj, index) => (
            <SectionCard key={proj.id} title={`Project #${index + 1}`} onRemove={() => removeProject(proj.id)}>
              <InputField label="Project Title" name="title" value={proj.title} onChange={(e) => handleProjectChange(index, e)} />
              <InputField label="Description" name="description" value={proj.description} onChange={(e) => handleProjectChange(index, e)} rows={2} />
            </SectionCard>
          ))}
          <button type="button" onClick={addProject} className="w-full py-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg">+ Add Project</button>
        </div>

        <div className="pt-4 pb-12">
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-extrabold text-lg rounded-xl">Generate Portfolio Preview</button>
        </div>
      </form>
    </div>
  );
};

export default ConfigForm;
