using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Default serializer factory used by the application. A list of supported types can be populated
    /// </summary>
    public class DefaultSerializerFactory : ISerializerFactory
    {
        private HashSet<Type> _types;

        public static readonly ISerializer DefaultSerializer = new DefaultJsonSerializer();

        public static readonly ISerializer SimpleSerializer = new DefaultJsonSerializer(new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.None,
        });

        /// <summary>
        /// Gets the list of supported types
        /// </summary>
        public HashSet<Type> Types => _types ?? (_types = new HashSet<Type>());

        /// <summary>
        /// Gets if type passed is supported by this factory
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public bool CanCreateForType(Type type)
        {
            return Types.Contains(type);
        }

        /// <summary>
        /// Creates a serializer for type specified.
        /// </summary>
        /// <param name="type"></param>
        /// <returns>Returns null if type is not supported</returns>
        public ISerializer CreateForType(Type type)
        {
            if (!Types.Contains(type)) return null;

            return new DefaultJsonSerializer();
        }

        class DefaultJsonSerializer : ISerializer
        {
            private readonly JsonSerializerSettings _settings;

            public DefaultJsonSerializer(JsonSerializerSettings settings)
            {
                _settings = settings;
            }

            public DefaultJsonSerializer()
            {
                _settings = new JsonSerializerSettings
                {
                    TypeNameHandling = TypeNameHandling.Objects,
                    TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple,
                };
            }

            /// <summary>
            /// Deserializes the specified stream.
            /// </summary>
            /// <param name="stream">The stream.</param>
            /// <param name="type">The type.</param>
            /// <returns>System.Object.</returns>
            public async Task<object> DeserializeAsync(Stream stream, Type type)
            {
                using (var reader = new StreamReader(stream, Encoding.Unicode))
                {
                    JsonSerializer jsonSerializer = GetSerializer();
                    return jsonSerializer.Deserialize(reader, type);
                }
            }

            /// <summary>
            /// Serializes the specified stream.
            /// </summary>
            /// <param name="stream">The stream.</param>
            /// <param name="value">The value.</param>
            public async Task SerializeAsync(Stream stream, object value)
            {
                using (var writer = new StreamWriter(stream, Encoding.Unicode, 1024, true))
                {
                    JsonSerializer jsonSerializer = GetSerializer();
                    jsonSerializer.Serialize(writer, value);
                }
            }

            private JsonSerializer GetSerializer()
            {
                return JsonSerializer.CreateDefault(_settings);
            }
        }
    }
}
