using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Extensions for the object type
    /// </summary>
    public static class ObjectExtensions
    {

        private static readonly JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.All };

        /// <summary>
        /// Clone an object using json technic
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        public static T Clone<T>(this T source)
        {
            // Don't serialize a null object, simply return the default for that object
            if (Object.ReferenceEquals(source, null))
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(source, jsonSerializerSettings), jsonSerializerSettings);
        }

        /// <summary>
        /// Serialize an object to string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string SerializeToString<T>(this T source)
        {
            return SerializeToString(source, null);
        }

        /// <summary>
        /// Serialize an object to string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="settings">Optional, if specified use the new settings instead of the default ones.</param>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string SerializeToString<T>(this T source, JsonSerializerSettings settings)
        {
            // Don't serialize a null object, simply return the default for that object
            if (Object.ReferenceEquals(source, null))
            {
                return String.Empty;
            }

            var s = (settings != null) ? settings : jsonSerializerSettings;

            return JsonConvert.SerializeObject(source, s);
        }

        /// <summary>
        /// Deserialize an object from the string
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        public static T DeserializeFromString<T>(this string source)
        {
            if (String.IsNullOrWhiteSpace(source)) return default(T);
            return JsonConvert.DeserializeObject<T>(source);
        }

    }
}
