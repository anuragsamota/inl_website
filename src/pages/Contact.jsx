import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building } from 'lucide-react';
import SEO from '../components/common/SEO';
import { getLabInfo, submitContactForm } from '../services/api';

export default function Contact() {
  const [labInfo, setLabInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Prospective Ph.D. Student',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadInfo() {
      const info = await getLabInfo();
      if (isMounted) setLabInfo(info);
    }
    loadInfo();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', role: 'Prospective Ph.D. Student', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact & Admissions | Intelligent Networks Laboratory"
        description="Contact the Intelligent Networks Laboratory for prospective Ph.D. admissions and research collaborations."
      />

      <div className="space-y-8 max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="border-b border-base-200 pb-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <Mail className="w-4 h-4" />
            <span>Admissions & Inquiries</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-base-content">
            Contact & Join Us
          </h1>
          <p className="text-xs text-base-content/70 max-w-2xl">
            Inquiries regarding prospective graduate admissions, research collaborations, and visiting scholar positions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="card card-border bg-base-100 p-6 space-y-6">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2 border-b border-base-200 pb-3">
              <Building className="w-4 h-4 text-primary" />
              <span>Laboratory Location</span>
            </h3>

            {labInfo && (
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-base-content/80">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-base-content block font-semibold">{labInfo.name}</strong>
                    <span>{labInfo.location}</span><br />
                    {labInfo.department && <span className="font-medium text-base-content/90">{labInfo.department}<br /></span>}
                    {labInfo.university && <span className="font-medium text-base-content/90">{labInfo.university}<br /></span>}
                    <span className="font-mono text-base-content/60">{labInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-base-content/80">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-base-content/60 font-mono block">Email</span>
                    <a href={`mailto:${labInfo.email}`} className="link link-primary font-semibold">
                      {labInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-base-content/80">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-base-content/60 font-mono block">Phone</span>
                    <span>{labInfo.phone}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="alert alert-info alert-soft text-xs leading-relaxed">
              <span><strong>Applicant Note:</strong> Ph.D. applicants should include a CV, transcript summary, research interests, and links to GitHub or Google Scholar in their message.</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card card-border bg-base-100 p-6 space-y-4">
            <h3 className="font-bold text-base text-base-content border-b border-base-200 pb-3">
              Send an Inquiry
            </h3>

            {submitted && (
              <div role="alert" className="alert alert-success alert-soft text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message received. We will respond promptly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-sm input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-xs font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input input-sm input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-medium">Role / Inquiry Type</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="select select-sm select-bordered"
                  >
                    <option value="Prospective Ph.D. Student">Prospective Ph.D. Student</option>
                    <option value="Postdoctoral Applicant">Postdoctoral Applicant</option>
                    <option value="Research Collaborator">Research Collaborator</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Ph.D. Application"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input input-sm input-bordered"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-medium">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Your research interests and background..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="textarea textarea-sm textarea-bordered resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-sm btn-primary w-full gap-2 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Sending...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </>
  );
}
