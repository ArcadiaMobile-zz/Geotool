using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    /// <summary>
    /// Implementation of IConfigurationReader based on XML. Each members are read as XML attributes
    /// </summary>
    public class XmlConfigurationReader : IConfigurationReader
    {
        private readonly XElement _element;

        private XmlConfigurationReader(XElement element)
        {
            _element = element;
        }

        /// <summary>
        /// Creates an instance of XmlConfigurationReader
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        public static XmlConfigurationReader Create(XElement element)
        {
            return new XmlConfigurationReader(element);
        }

        /// <summary>
        /// Gets the configuration as a dynamic object
        /// </summary>
        /// <returns></returns>
        public dynamic GetConfiguration()
        {
            return new XmlConfiguration(_element);
        }

        protected class XmlConfiguration : DynamicObject
        {
            private XElement _element;

            public XmlConfiguration(XElement _element)
            {
                this._element = _element;
            }

            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                var attribute = _element.Attribute(binder.Name);
                if (attribute != null)
                {
                    result = new XAttributeEx(attribute);
                    return true;
                }

                result = null;

                return false;
            }

        }

        public class XAttributeEx 
        {
            private XAttribute _inner;

            internal XAttributeEx(XAttribute inner)
            {
                _inner = inner;
            }

            [CLSCompliant(false)]
            public static implicit operator bool?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (bool?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to an System.Int32.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Int32.
            //
            // Returns:
            //     A System.Int32 that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Int32 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator int(XAttributeEx attribute)
            {
                return (int)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator int?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (int?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.Boolean.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Boolean.
            //
            // Returns:
            //     A System.Boolean that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Boolean value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator bool(XAttributeEx attribute)
            {
                return (bool)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator uint?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (uint?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to an System.Int64.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Int64.
            //
            // Returns:
            //     A System.Int64 that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Int64 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator long(XAttributeEx attribute)
            {
                return (long)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator long?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;
                return (long?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.UInt64.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.UInt64.
            //
            // Returns:
            //     A System.UInt64 that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.UInt64 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator ulong(XAttributeEx attribute)
            {
                return (ulong)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.UInt32.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.UInt32.
            //
            // Returns:
            //     A System.UInt32 that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.UInt32 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator uint(XAttributeEx attribute)
            {
                return (uint)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator DateTime?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (DateTime?)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator Guid?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (Guid?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.Guid.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Guid.
            //
            // Returns:
            //     A System.Guid that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Guid value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator Guid(XAttributeEx attribute)
            {
                return (Guid)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator TimeSpan?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (TimeSpan?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.TimeSpan.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.TimeSpan.
            //
            // Returns:
            //     A System.TimeSpan that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.TimeSpan value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator TimeSpan(XAttributeEx attribute)
            {
                return (TimeSpan)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator DateTimeOffset?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (DateTimeOffset?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.DateTimeOffset.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.DateTimeOffset.
            //
            // Returns:
            //     A System.DateTimeOffset that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.DateTimeOffset value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator DateTimeOffset(XAttributeEx attribute)
            {
                return (DateTimeOffset)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.String.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.String.
            //
            // Returns:
            //     A System.String that contains the content of this System.Xml.Linq.XAttribute.
            [CLSCompliant(false)]
            public static implicit operator string(XAttributeEx attribute)
            {
                return (string)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.DateTime.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.DateTime.
            //
            // Returns:
            //     A System.DateTime that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.DateTime value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator DateTime(XAttributeEx attribute)
            {
                return (DateTime)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator decimal?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (decimal?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.Decimal.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Decimal.
            //
            // Returns:
            //     A System.Decimal that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Decimal value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator decimal(XAttributeEx attribute)
            {
                return (decimal)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator double?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (double?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.Double.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Double.
            //
            // Returns:
            //     A System.Double that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Double value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator double(XAttributeEx attribute)
            {
                return (double)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator float?(XAttributeEx attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._inner.Value))
                    return null;

                return (float?)attribute._inner;
            }
            //
            // Summary:
            //     Cast the value of this System.Xml.Linq.XAttribute to a System.Single.
            //
            // Parameters:
            //   attribute:
            //     The System.Xml.Linq.XAttribute to cast to System.Single.
            //
            // Returns:
            //     A System.Single that contains the content of this System.Xml.Linq.XAttribute.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Single value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator float(XAttributeEx attribute)
            {
                return (float)attribute._inner;
            }
            [CLSCompliant(false)]
            public static implicit operator ulong?(XAttributeEx attribute)
            {
                return (ulong)attribute._inner;
            }
        }
    }
}
