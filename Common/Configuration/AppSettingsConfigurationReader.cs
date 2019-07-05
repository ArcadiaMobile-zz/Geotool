using System;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    /// <summary>
    /// Implementation of IConfigurationReader based on AppSettings. Each key/value are read as property
    /// </summary>
    public class AppSettingsConfigurationReader : IConfigurationReader
    {
        private Dictionary<string, string> _dictionary;


        private AppSettingsConfigurationReader(Dictionary<string, string> dictionary)
        {
            this._dictionary = dictionary;
        }

        /// <summary>
        /// Creates an instance of AppSettingsConfigurationReader filtering keys by prefix
        /// </summary>
        /// <param name="prefix"></param>
        /// <returns></returns>
        public static AppSettingsConfigurationReader Create(string prefix)
        {
            var keys = ConfigurationManager.AppSettings.Keys.Cast<string>();
            if (!String.IsNullOrWhiteSpace(prefix))
                keys = keys.Where(s => s.IndexOf(prefix, StringComparison.InvariantCultureIgnoreCase) == 0);

            var dictionary = keys.ToDictionary(k => k.Remove(0, prefix.Length), k => ConfigurationManager.AppSettings[k], StringComparer.InvariantCultureIgnoreCase);

            return new AppSettingsConfigurationReader(dictionary);
        }

        /// <summary>
        /// Gets the configuration as a dynamic object
        /// </summary>
        /// <returns></returns>
        public dynamic GetConfiguration()
        {
            return new AppSettingsConfiguration(_dictionary);
        }

        protected class AppSettingsConfiguration : DynamicObject
        {
            private Dictionary<string, string> _dictionary;

            public AppSettingsConfiguration(Dictionary<string, string> dictionary)
            {
                this._dictionary = dictionary;
            }

            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                string value;
                if (_dictionary.TryGetValue(binder.Name, out value))
                {
                    result = new AppSettingValue(value);
                    return true;
                }

                result = null;

                return false;
            }

        }

        public class AppSettingValue
        {
            private string _value;

            internal AppSettingValue(string value)
            {
                _value = value;
            }

            [CLSCompliant(false)]
            public static implicit operator bool?(AppSettingValue attribute)
            {
                return bool.Parse(attribute._value);
            }
            //
            // Summary:
            //     Cast the value of this string to an System.Int32.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Int32.
            //
            // Returns:
            //     A System.Int32 that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Int32 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator int(AppSettingValue attribute)
            {
                return Int32.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator int?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return Int32.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.Boolean.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Boolean.
            //
            // Returns:
            //     A System.Boolean that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Boolean value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator bool(AppSettingValue attribute)
            {
                return bool.Parse(attribute._value);
            }
            [CLSCompliant(false)]
            public static implicit operator uint?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return uint.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to an System.Int64.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Int64.
            //
            // Returns:
            //     A System.Int64 that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Int64 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator long(AppSettingValue attribute)
            {
                return long.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator long?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;
                return long.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.UInt64.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.UInt64.
            //
            // Returns:
            //     A System.UInt64 that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.UInt64 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator ulong(AppSettingValue attribute)
            {
                return ulong.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.UInt32.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.UInt32.
            //
            // Returns:
            //     A System.UInt32 that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.UInt32 value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator uint(AppSettingValue attribute)
            {
                return uint.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator DateTime?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return DateTime.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator Guid?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return Guid.Parse(attribute._value);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.Guid.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Guid.
            //
            // Returns:
            //     A System.Guid that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Guid value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator Guid(AppSettingValue attribute)
            {
                return Guid.Parse(attribute._value);
            }
            [CLSCompliant(false)]
            public static implicit operator TimeSpan?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return TimeSpan.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.TimeSpan.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.TimeSpan.
            //
            // Returns:
            //     A System.TimeSpan that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.TimeSpan value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator TimeSpan(AppSettingValue attribute)
            {
                return TimeSpan.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator DateTimeOffset?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return DateTimeOffset.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.DateTimeOffset.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.DateTimeOffset.
            //
            // Returns:
            //     A System.DateTimeOffset that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.DateTimeOffset value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator DateTimeOffset(AppSettingValue attribute)
            {
                return DateTimeOffset.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.String.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.String.
            //
            // Returns:
            //     A System.String that contains the content of this string.
            [CLSCompliant(false)]
            public static implicit operator string(AppSettingValue attribute)
            {
                return attribute._value;
            }
            //
            // Summary:
            //     Cast the value of this string to a System.DateTime.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.DateTime.
            //
            // Returns:
            //     A System.DateTime that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.DateTime value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator DateTime(AppSettingValue attribute)
            {
                return DateTime.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator decimal?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return decimal.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.Decimal.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Decimal.
            //
            // Returns:
            //     A System.Decimal that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Decimal value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator decimal(AppSettingValue attribute)
            {
                return decimal.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator double?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return double.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.Double.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Double.
            //
            // Returns:
            //     A System.Double that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Double value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator double(AppSettingValue attribute)
            {
                return double.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator float?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return float.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            //
            // Summary:
            //     Cast the value of this string to a System.Single.
            //
            // Parameters:
            //   attribute:
            //     The string to cast to System.Single.
            //
            // Returns:
            //     A System.Single that contains the content of this string.
            //
            // Exceptions:
            //   System.FormatException:
            //     The attribute does not contain a valid System.Single value.
            //
            //   System.ArgumentNullException:
            //     The attribute parameter is null.
            [CLSCompliant(false)]
            public static implicit operator float(AppSettingValue attribute)
            {
                return float.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
            [CLSCompliant(false)]
            public static implicit operator ulong?(AppSettingValue attribute)
            {
                if (String.IsNullOrWhiteSpace(attribute._value))
                    return null;

                return ulong.Parse(attribute._value, CultureInfo.InvariantCulture);
            }
        }
    }
}
