using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    /// <summary>
    /// Interfaces to represent an object which can read a configuration and give a dynamic object as result
    /// </summary>
    public interface IConfigurationReader
    {
        /// <summary>
        /// Gets the configuration as a dynamic object
        /// </summary>
        /// <returns></returns>
        dynamic GetConfiguration();
    }
}
