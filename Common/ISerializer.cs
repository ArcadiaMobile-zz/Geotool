using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Interface representing the object used to serialize and deserialize objects
    /// </summary>
    public interface ISerializer
    {
        /// <summary>
        /// Deserializes the specified stream.
        /// </summary>
        /// <param name="stream">The stream.</param>
        /// <param name="type">The type.</param>
        /// <returns>System.Object.</returns>
        Task<object> DeserializeAsync(Stream stream, Type type);

        /// <summary>
        /// Serializes the specified stream.
        /// </summary>
        /// <param name="stream">The stream.</param>
        /// <param name="value">The value.</param>
        Task SerializeAsync(Stream stream, object value);
    }
}
