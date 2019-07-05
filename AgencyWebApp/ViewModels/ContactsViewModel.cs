using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AgencyWebApp.ViewModels
{
    public class ContactsViewModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        [FromForm(Name = "g-recaptcha-response")]
        public string Captcha { get; set; }

        public bool Sent { get; set; }
    }
}
