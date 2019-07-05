using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AgencyWebApp.ViewModels;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace AgencyWebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //public IActionResult Terms()
        //{
        //    return View();
        //}

        //[HttpGet]
        //public IActionResult Contacts()
        //{
        //    return View(new ContactsViewModel());
        //}

        //[HttpPost]
        //public async Task<IActionResult> Contacts(ContactsViewModel viewModel)
        //{
        //    if (!await ValidateCaptchaAsync(viewModel.Captcha))
        //    {
        //        ModelState.AddModelError(nameof(viewModel.Captcha), "Captcha non valido");
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        await SendEmailAsync(viewModel.Email, viewModel.FullName, viewModel.Subject, viewModel.Message);

        //        viewModel.Sent = true;
        //    }
        //    return View(viewModel);
        //}

        //private async Task SendEmailAsync(string email, string fullName, string subject, string message)
        //{
        //    var configuration = HttpContext.RequestServices.GetRequiredService<IConfigurationRoot>().GetSection("contacts");
        //    var emailMessage = new MimeMessage();

        //    emailMessage.From.Add(new MailboxAddress(fullName, email));
        //    emailMessage.To.Add(new MailboxAddress(configuration["to"]));
        //    emailMessage.Subject = subject;
        //    emailMessage.Body = new TextPart("plain") { Text = message };

        //    using (var client = new SmtpClient())
        //    {
        //        await client.ConnectAsync(configuration["smtp"], 587, SecureSocketOptions.Auto);
        //        await client.AuthenticateAsync(configuration["username"], configuration["password"]);
        //        await client.SendAsync(emailMessage);
        //        await client.DisconnectAsync(true);
        //    }
        //}

        //private async Task<bool> ValidateCaptchaAsync(string captcha)
        //{
        //    string secret = HttpContext.RequestServices.GetRequiredService<IConfigurationRoot>()["recaptcha:secret"];

        //    var content = new FormUrlEncodedContent(new Dictionary<string, string>
        //    {
        //        { "secret", secret },
        //        { "response", captcha },
        //        // If local connection
        //        { "remoteip", (HttpContext.Connection.LocalPort > 443) ? "2.233.120.118" : HttpContext.Connection.RemoteIpAddress.ToString() }
        //    });
        //    var client = new HttpClient();
        //    HttpResponseMessage response = await client.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
        //    response.EnsureSuccessStatusCode();

        //    if (response.StatusCode == System.Net.HttpStatusCode.OK)
        //    {
        //        string json = await response.Content.ReadAsStringAsync();
        //        var jsonResponse = JsonConvert.DeserializeAnonymousType(json, new { success = false });

        //        return jsonResponse.success;
        //    }

        //    return false;
        //}
    }
}
