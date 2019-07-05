using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common.PathBuilder
{

    /// <summary>
    /// Helper class with fluent API which aim is to build a path for a final uri
    /// </summary>
    public class PathBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PathBuilder"/> class.
        /// </summary>
        public PathBuilder()
        {
            _queryStrings = new Dictionary<string, string>();
        }

        /// <summary>
        /// The _paths
        /// </summary>
        private List<String> _paths;

        /// <summary>
        /// Gets the list of the paths to concatenate
        /// </summary>
        /// <value>The paths.</value>
        public List<string> Paths
        {
            get { return _paths ?? (_paths = new List<string>()); }
        }

        /// <summary>
        /// The list of parameters for the query string
        /// </summary>
        private Dictionary<string, string> _queryStrings;

        /// <summary>
        /// Appends the path to the list calling object.ToString.
        /// </summary>
        /// <param name="path">The path.</param>
        /// <returns>PathBuilder.</returns>
        public PathBuilder AppendPath(object path)
        {
            return AppendPath(path.ToString());
        }

        /// <summary>
        /// Appends the path to the list.
        /// </summary>
        /// <param name="path">The path.</param>
        /// <returns>PathBuilder.</returns>
        public PathBuilder AppendPath(string path)
        {
            Paths.Add(path);

            return this;
        }

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>A <see cref="System.String" /> that represents this instance.</returns>
        public override string ToString()
        {
            var sb = new StringBuilder(String.Join("/", Paths));
            if (_queryStrings.Count > 0)
            {
                sb.Append("?");
                foreach (var p in _queryStrings)
                {
                    sb.AppendFormat("{0}={1}", WebUtility.UrlEncode(p.Key), WebUtility.UrlEncode(p.Value));
                    sb.Append("&");
                }
            }

            return sb.ToString();
        }

        /// <summary>
        /// Appends the query string to the dictionary.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <returns>PathBuilder.</returns>
        public PathBuilder AppendQueryString(string key, string value)
        {
            _queryStrings.Add(key, value);

            return this;
        }
    }
}
