using ArcadiaMobile.ThinkBig.Common.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Interface used by any object which requires an initialization
    /// </summary>
    public interface IInit
    {
        /// <summary>
        /// Initializes the object using the configuration
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        void Init(dynamic configuration);
    }

    /// <summary>
    /// Extension methods for IInit
    /// </summary>
    public static class InitExtensions
    {
        /// <summary>
        /// Initialize the object using an IConfigurationReader
        /// </summary>
        /// <param name="initializable"></param>
        /// <param name="configurationReader"></param>
        public static void InitFromReader(this IInit initializable, IConfigurationReader configurationReader)
        {
            initializable.Init(configurationReader.GetConfiguration());
        }
    }
}
