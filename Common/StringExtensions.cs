using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public static class StringExtensions
    {
        /// <summary>
        /// Check if string contains grave chars
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string CheckStringContainsGrave(this string name)
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var c in name)
                stringBuilder.Append(CheckIfCharIsGrave(c));

            return stringBuilder.ToString();
        }

        /// <summary>
        /// Normalize string for URL
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string NormalizeForUrl(this string name)
        {
            String normalizedString = name.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
                var charChecked = CheckIfCharIsGrave(c);
                switch (CharUnicodeInfo.GetUnicodeCategory(charChecked))
                {
                    case UnicodeCategory.LowercaseLetter:
                    case UnicodeCategory.UppercaseLetter:
                    case UnicodeCategory.DecimalDigitNumber:
                        stringBuilder.Append(charChecked);
                        break;
                    case UnicodeCategory.SpaceSeparator:
                    case UnicodeCategory.ConnectorPunctuation:
                    case UnicodeCategory.DashPunctuation:
                    case UnicodeCategory.OtherPunctuation:
                        stringBuilder.Append('-');
                        break;
                }
            }
            string result = stringBuilder.ToString();
            return String.Join("-", result.Split(new char[] { '-' }
                , StringSplitOptions.RemoveEmptyEntries)); // remove duplicates
        }

        private static char CheckIfCharIsGrave(char c)
        {
            string eGrave = "èéÈÉêëÊË";
            string aGrave = "âäàåÄÅÁÀÂÄÅ";
            string iGrave = "ìÌïÏîÎ";
            string oGrave = "ôòóÔÒÓ";
            string uGrave = "ùÙ";

            return aGrave.Contains(c) ? Char.IsUpper(c) ? 'A' : 'a' :
                   eGrave.Contains(c) ? Char.IsUpper(c) ? 'E' : 'e' :
                   iGrave.Contains(c) ? Char.IsUpper(c) ? 'I' : 'i' :
                   oGrave.Contains(c) ? Char.IsUpper(c) ? 'O' : 'o' :
                   uGrave.Contains(c) ? Char.IsUpper(c) ? 'U' : 'u' :
                   c;
        }
    }
}
