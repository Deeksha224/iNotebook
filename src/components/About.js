

const About = () => {

  return (
    <div className="container my-3">
      <div className="card text-bg-dark" style={{ maxWidth: '100%', fontSize: '1.25rem', color:'black' }}>
        <img src="https://images.unsplash.com/photo-1587135991058-8816b028691f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5vdGVib29rfGVufDB8fDB8fHww" className="card-img" alt="..." style={{ height: '400px', objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-end">
          <h5 className="card-title display-5">Welcome to iNotebook</h5>
          <p className="card-text">iNotebook is your personal digital notebook that helps you stay organized, secure, and always in control of your thoughts and ideas. Whether you're jotting down quick notes, keeping track of tasks, or planning something big — iNotebook ensures your content is just a click away, anytime, anywhere.</p>
          <p className="card-text"><small>Built with modern technologies and a focus on user experience, iNotebook provides a safe, clean, and powerful environment to manage your digital notes.</small></p>
        </div>
      </div>
      <h2 className="continer my-3">Features</h2>

      <div className="continer my-3">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">📝 Note Management</div>
              <div className="card-body">
                <h5 className="card-title">Effortless Note Creation</h5>
                <p className="card-text">Create, edit, and delete your notes effortlessly with a clean and intuitive interface.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">🔒 Data Security</div>
              <div className="card-body">
                <h5 className="card-title">Private & Secure Access</h5>
                <p className="card-text">Your notes are encrypted and can only be accessed through your personal account — ensuring your data stays safe.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">☁️ Accessibility</div>
              <div className="card-body">
                <h5 className="card-title">Anytime, Anywhere</h5>
                <p className="card-text">Access your notes from any device, at any time. All data is securely stored and synced in the cloud.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">🎨 User Experience</div>
              <div className="card-body">
                <h5 className="card-title">Minimal & Clean Interface</h5>
                <p className="card-text">A distraction-free layout focused on what matters most — your thoughts, ideas, and tasks.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">⚡ Performance</div>
              <div className="card-body">
                <h5 className="card-title">Fast & Responsive</h5>
                <p className="card-text">Built with modern technologies to deliver a seamless, high-speed experience on all screen sizes.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-dark mb-3" style={{ maxWidth: '100%' }}>
              <div className="card-header">💻 Cross-Platform</div>
              <div className="card-body">
                <h5 className="card-title">Device Sync</h5>
                <p className="card-text">Seamlessly switch between your mobile, tablet, or desktop — your notes stay in sync across all devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>


  )
}

export default About
