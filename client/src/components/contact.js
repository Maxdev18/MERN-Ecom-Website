import * as React from 'react';
import '../styles/contactpage/contact.css';
import emailjs from '@emailjs/browser';

export function Contact() {
    //Send email function
    const form = React.useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_g9dwmq8', 'template_6mg7e93', e.target, 'user_XeaLLHJWZAwNz86SUdokG')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };

    return (
        <div className="contact-container">
            <h1 className="title">Contact Us</h1>
            <div className="form-container">
                <form ref={form} className="contact-form" onSubmit={sendEmail}>
                    <div className="input-container">
                        <label className="input-label">E-mail:</label>
                        <input type="email" className="input" placeholder="Email" name="email" />
                    </div>
                    <div className="input-container">
                        <label className="input-label">Description:</label>
                        <textarea className="input description-input" placeholder="Description" name="description" />
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
