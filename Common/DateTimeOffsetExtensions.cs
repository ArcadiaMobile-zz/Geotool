using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Extensions for DateTimeOffset
    /// </summary>
    public static class DateTimeOffsetExtensions
    {
        /// <summary>
        /// Convert the date to west european timezone
        /// </summary>
        /// <param name="dateTimeOffset"></param>
        /// <returns></returns>
        public static DateTimeOffset ToWestEuropeDateTimeOffset(this DateTimeOffset dateTimeOffset)
        {
            return TimeZoneInfo.ConvertTime(dateTimeOffset, TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time"));
        }

        public static DateTimeOffset CheckDaylightSavingTime(this DateTimeOffset dateTimeOffset)
        {
            var now = DateTimeOffset.Now;

            if (now.Offset != dateTimeOffset.Offset)
                dateTimeOffset = new DateTimeOffset(dateTimeOffset.DateTime, now.Offset);

            return dateTimeOffset;
        }
    }
}
