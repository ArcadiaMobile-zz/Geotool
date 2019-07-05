using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public static class PrincipalExtensions
    {
        /// <summary>
        /// Add to current principal the Bot role
        /// </summary>
        /// <param name="principal"></param>
        public static void AddBotRole(this IPrincipal principal)
        {
            var cp = principal as ClaimsPrincipal;
            if (cp == null) throw new InvalidOperationException("Only ClaimsPrincipal is supported");

            var ci = cp.Identities.OfType<ClaimsIdentity>().FirstOrDefault();
            if (ci == null) throw new InvalidOperationException("Only ClaimsIdentity is supported");

            if (ci.FindFirst(System.Security.Claims.ClaimTypes.Role) == null)
                ci.AddClaim(new Claim(System.Security.Claims.ClaimTypes.Role, Roles.Bot));
        }

        /// <summary>
        /// Impersonate the Bot for general operations
        /// </summary>
        /// <param name="principal"></param>
        /// <returns></returns>
        public static IDisposable ImpersonateBot(this IPrincipal principal)
        {
            var i = new Impersonation();
            var claims = new[]
            {
                new Claim(System.Security.Claims.ClaimTypes.GivenName, Roles.Bot),
                new Claim(System.Security.Claims.ClaimTypes.Surname, Roles.Bot),
                new Claim(System.Security.Claims.ClaimTypes.Role, Roles.Bot),
                new Claim(ClaimTypes.ObjectIdentifier, Roles.Bot),
                new Claim("name", Roles.Bot),
                new Claim("emails", "bot@bot.it"),
                new Claim(Common.ClaimTypes.IdentityProvider, "Manual"),
            };
            Thread.CurrentPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, "bot"));

            return i;
        }

        /// <summary>
        /// Impersonate a specific account
        /// </summary>
        /// <param name="principal"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public static IDisposable ImpersonateAccount(this IPrincipal principal, string account)
        {
            var i = new Impersonation();
            var claims = new[]
            {
                new Claim(System.Security.Claims.ClaimTypes.GivenName, account),
                new Claim(System.Security.Claims.ClaimTypes.Surname, account),
                new Claim(ClaimTypes.ObjectIdentifier, account),
                new Claim("emails", "account@account.it"),
                new Claim(Common.ClaimTypes.IdentityProvider, "Manual"),
            };
            Thread.CurrentPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, "account"));

            return i;
        }

        /// <summary>
        /// Gets if the principal has been release for agency purpose
        /// </summary>
        /// <param name="principal"></param>
        /// <returns></returns>
        public static bool IsForAgency(this IPrincipal principal)
        {
            // Check the policy used for signin/up
            string policyName = ((ClaimsPrincipal)principal)?.FindFirst("tfp")?.Value;
            if (policyName == null) return false;

            return (policyName.IndexOf("Agency", StringComparison.InvariantCultureIgnoreCase) >= 0);
        }

        protected class Impersonation : IDisposable
        {
            private readonly IPrincipal _previous;

            public Impersonation()
            {
                _previous = Thread.CurrentPrincipal;
            }

            public void Dispose()
            {
                Thread.CurrentPrincipal = _previous;
            }
        }

        /// <summary>
        /// Replace lang url Facebook
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static String ReplaceLangUrl(this String url)
        {
            return url
                .Replace("it-it", "www")
                .Replace("fr-fr", "www")
                .Replace("de-de", "www")
                .Replace("es-es", "www")
                .Replace("en-en", "www")
                .Replace("pt-pt", "www");
        }

        /// <summary>
        /// Get attribute value from enum
        /// </summary>
        /// <typeparam name="TAttribute"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static TAttribute GetAttribute<TAttribute>(this Enum value)
            where TAttribute : Attribute
        {
            var type = value.GetType();
            var name = Enum.GetName(type, value);
            return type.GetField(name).GetCustomAttribute<TAttribute>();
        }
    }
}
