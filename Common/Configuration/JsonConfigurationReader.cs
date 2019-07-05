using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    /// <summary>
    /// IConfigurationReader implementation based on Json
    /// </summary>
    public class JsonConfigurationReader : IConfigurationReader
    {
        private readonly string _json;

        private JsonConfigurationReader(string json)
        {
            _json = json;
        }

        /// <summary>
        /// Gets the configuration as a dynamic object
        /// </summary>
        /// <returns></returns>
        public dynamic GetConfiguration()
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject(_json);
        }

        /// <summary>
        /// Creates an instance of JsonConfigurationReader
        /// </summary>
        /// <param name="json">Json to read</param>
        /// <returns></returns>
        public static JsonConfigurationReader Create(string json)
        {
            return new JsonConfigurationReader(json);
        }
    }
}
