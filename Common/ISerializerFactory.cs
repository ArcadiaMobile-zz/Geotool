using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Interface to represents an object which create a serializer for a specific object type
    /// </summary>
    public interface ISerializerFactory
    {
        /// <summary>
        /// Creates a serializer for type specified.
        /// </summary>
        /// <param name="type"></param>
        /// <returns>Returns null if type is not supported</returns>
        ISerializer CreateForType(Type type);

        /// <summary>
        /// Gets if type passed is supported by this factory
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        bool CanCreateForType(Type type);
    }

    /// <summary>
    /// Extensions for ISerializerFactory
    /// </summary>
    public static class SerializerFactoryExtensions
    {
        /// <summary>
        /// Looks for a ISerializerFactory which supports the serialization for the type.
        /// </summary>
        /// <param name="factories"></param>
        /// <returns>Null if no factory found</returns>
        public static ISerializer GetForType<T>(this IEnumerable<ISerializerFactory> factories)
        {
            return GetForType(factories, typeof(T));
        }

        /// <summary>
        /// Looks for a ISerializerFactory which supports the serialization for the type.
        /// </summary>
        /// <param name="factories"></param>
        /// <param name="type"></param>
        /// <returns>Null if no factory found</returns>
        public static ISerializer GetForType(this IEnumerable<ISerializerFactory> factories, Type type)
        {
            var factory = factories.FirstOrDefault(f => f.CanCreateForType(type));
            if (factory == null) return null;

            return factory.CreateForType(type);
        }
    }
}
