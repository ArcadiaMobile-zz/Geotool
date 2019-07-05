using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// The interface represent an object which is serializable
    /// </summary>
    public interface ISerializable
    {
        /// <summary>
        /// Get the serializer to use for the object
        /// </summary>
        ISerializer Serializer { get; }
    }
}
