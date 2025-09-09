import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'Unknown';

    // Get user agent for device detection
    const userAgent = request.headers.get('user-agent') || '';
    
    // Enhanced device detection
    let deviceName = 'Unknown Device';
    let deviceType = 'Unknown';
    let browser = 'Unknown';
    let os = 'Unknown';

    // Operating System detection
    if (userAgent.includes('Windows NT 10.0')) {
      os = 'Windows 10/11';
    } else if (userAgent.includes('Windows NT 6.3')) {
      os = 'Windows 8.1';
    } else if (userAgent.includes('Windows NT 6.1')) {
      os = 'Windows 7';
    } else if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac OS X')) {
      const macMatch = userAgent.match(/Mac OS X ([0-9_]+)/);
      os = macMatch ? `macOS ${macMatch[1].replace(/_/g, '.')}` : 'macOS';
    } else if (userAgent.includes('iPhone OS')) {
      const iosMatch = userAgent.match(/iPhone OS ([0-9_]+)/);
      os = iosMatch ? `iOS ${iosMatch[1].replace(/_/g, '.')}` : 'iOS';
    } else if (userAgent.includes('Android')) {
      const androidMatch = userAgent.match(/Android ([0-9.]+)/);
      os = androidMatch ? `Android ${androidMatch[1]}` : 'Android';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    }

    // Device type and name detection
    if (userAgent.includes('iPhone')) {
      deviceType = 'Mobile';
      deviceName = 'iPhone';
    } else if (userAgent.includes('iPad')) {
      deviceType = 'Tablet';
      deviceName = 'iPad';
    } else if (userAgent.includes('Android')) {
      if (userAgent.includes('Mobile')) {
        deviceType = 'Mobile';
        deviceName = 'Android Phone';
      } else {
        deviceType = 'Tablet';
        deviceName = 'Android Tablet';
      }
    } else if (userAgent.includes('Mac')) {
      deviceType = 'Desktop';
      deviceName = 'Mac';
    } else if (userAgent.includes('Windows')) {
      deviceType = 'Desktop';
      deviceName = 'Windows PC';
    } else if (userAgent.includes('Linux')) {
      deviceType = 'Desktop';
      deviceName = 'Linux Computer';
    }

    // Browser detection
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browser = 'Safari';
    } else if (userAgent.includes('Edg')) {
      browser = 'Microsoft Edge';
    } else if (userAgent.includes('Opera')) {
      browser = 'Opera';
    }

    // Get additional IP information from external service
    let locationInfo = null;
    try {
      const ipInfoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,timezone,isp,org,as,query`);
      if (ipInfoResponse.ok) {
        const ipInfo = await ipInfoResponse.json();
        if (ipInfo.status === 'success') {
          locationInfo = {
            country: ipInfo.country,
            region: ipInfo.regionName,
            city: ipInfo.city,
            timezone: ipInfo.timezone,
            isp: ipInfo.isp,
            organization: ipInfo.org,
            asn: ipInfo.as
          };
        }
      }
    } catch (error) {
      console.log('Could not fetch IP location info:', error);
    }

    // Get screen information from headers if available
    const screenInfo = {
      width: request.headers.get('sec-ch-viewport-width') || 'Unknown',
      height: request.headers.get('sec-ch-viewport-height') || 'Unknown'
    };

    const deviceInfo = {
      ip,
      deviceName,
      deviceType,
      os,
      browser,
      userAgent,
      location: locationInfo,
      screen: screenInfo,
      timestamp: new Date().toISOString(),
      headers: {
        'x-forwarded-for': request.headers.get('x-forwarded-for'),
        'x-real-ip': request.headers.get('x-real-ip'),
        'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
        'x-client-ip': request.headers.get('x-client-ip')
      }
    };
    console.log('Device Info:', deviceInfo);
    return NextResponse.json(deviceInfo);
  } catch (error) {
    console.error('Error getting device info:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get device information',
        ip: 'Unknown',
        deviceName: 'Unknown Device',
        deviceType: 'Unknown',
        os: 'Unknown',
        browser: 'Unknown'
      },
      { status: 500 }
    );
  }
}
