using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    [AttributeUsage(AttributeTargets.Assembly)]
    public class BuildVersionAttribute : Attribute
    {
        public BuildVersionAttribute(string version)
        {
            Version = version;
        }

        public string Version { get; }

        public static string Get()
        {
            return typeof(BuildVersionAttribute).GetTypeInfo().Assembly.GetCustomAttributes(typeof(BuildVersionAttribute))
                .OfType<BuildVersionAttribute>()
                .FirstOrDefault()?.Version ?? "";
        }
    }
}
