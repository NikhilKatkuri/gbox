// Comprehensive utility to get device information from backend API

export interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  isp?: string;
  organization?: string;
  asn?: string;
}

export interface ScreenInfo {
  width: string;
  height: string;
}

export interface DeviceInfo {
  ip: string;
  deviceName: string;
  deviceType: string;
  os: string;
  browser: string;
  userAgent: string;
  location?: LocationInfo | null;
  screen: ScreenInfo;
  timestamp: string;
  headers?: {
    'x-forwarded-for'?: string | null;
    'x-real-ip'?: string | null;
    'cf-connecting-ip'?: string | null;
    'x-client-ip'?: string | null;
  };
}

export interface BasicDeviceInfo {
  ip: string;
  deviceName: string;
}

// Enhanced device info function that gets data from backend API
export async function getDeviceInfo(): Promise<DeviceInfo> {
  try {
    // Get comprehensive device info from our backend API
    const response = await fetch('/api/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const deviceInfo = await response.json();
    
    // Add client-side screen information if available
    if (typeof window !== 'undefined') {
      deviceInfo.screen = {
        width: window.screen?.width?.toString() || deviceInfo.screen?.width || 'Unknown',
        height: window.screen?.height?.toString() || deviceInfo.screen?.height || 'Unknown',
        availWidth: window.screen?.availWidth?.toString() || 'Unknown',
        availHeight: window.screen?.availHeight?.toString() || 'Unknown',
        colorDepth: window.screen?.colorDepth?.toString() || 'Unknown',
        pixelDepth: window.screen?.pixelDepth?.toString() || 'Unknown'
      };
      
      // Add viewport information
      deviceInfo.viewport = {
        width: window.innerWidth?.toString() || 'Unknown',
        height: window.innerHeight?.toString() || 'Unknown'
      };
      
      // Add additional browser info
      deviceInfo.browser_info = {
        language: navigator.language || 'Unknown',
        languages: navigator.languages?.join(', ') || 'Unknown',
        platform: navigator.platform || 'Unknown',
        cookieEnabled: navigator.cookieEnabled?.toString() || 'Unknown',
        onLine: navigator.onLine?.toString() || 'Unknown'
      };
    }
    
    return deviceInfo;
    
  } catch (error) {
    console.error('Error getting device info from backend:', error);
    
    // Fallback to basic client-side detection
    return getBasicDeviceInfo();
  }
}

// Fallback function for basic device detection (client-side only)
export async function getBasicDeviceInfo(): Promise<DeviceInfo> {
  try {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let deviceName = 'Unknown Device';
    let deviceType = 'Unknown';
    let os = 'Unknown';
    let browser = 'Unknown';
    
    // Simple device detection
    if (userAgent.includes('iPhone')) {
      deviceName = 'iPhone';
      deviceType = 'Mobile';
      os = 'iOS';
    } else if (userAgent.includes('iPad')) {
      deviceName = 'iPad';
      deviceType = 'Tablet';
      os = 'iOS';
    } else if (userAgent.includes('Android')) {
      deviceName = 'Android Device';
      deviceType = userAgent.includes('Mobile') ? 'Mobile' : 'Tablet';
      os = 'Android';
    } else if (userAgent.includes('Mac')) {
      deviceName = 'Mac';
      deviceType = 'Desktop';
      os = 'macOS';
    } else if (userAgent.includes('Windows')) {
      deviceName = 'Windows PC';
      deviceType = 'Desktop';
      os = 'Windows';
    } else if (userAgent.includes('Linux')) {
      deviceName = 'Linux Device';
      deviceType = 'Desktop';
      os = 'Linux';
    }
    
    // Simple browser detection
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
    
    // Try to get IP from external service as fallback
    let ip = 'Unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch (ipError) {
      console.warn('Could not fetch IP from external service:', ipError);
    }
    
    return {
      ip,
      deviceName,
      deviceType,
      os,
      browser,
      userAgent,
      location: null,
      screen: {
        width: typeof window !== 'undefined' ? window.screen?.width?.toString() || 'Unknown' : 'Unknown',
        height: typeof window !== 'undefined' ? window.screen?.height?.toString() || 'Unknown' : 'Unknown'
      },
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error in basic device info detection:', error);
    return {
      ip: 'Unknown',
      deviceName: 'Unknown Device',
      deviceType: 'Unknown',
      os: 'Unknown',
      browser: 'Unknown',
      userAgent: '',
      location: null,
      screen: {
        width: 'Unknown',
        height: 'Unknown'
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Simple function that returns only IP and device name (for backward compatibility)
export async function getSimpleDeviceInfo(): Promise<BasicDeviceInfo> {
  try {
    const fullInfo = await getDeviceInfo();
    return {
      ip: fullInfo.ip,
      deviceName: fullInfo.deviceName
    };
  } catch {
    const basicInfo = await getBasicDeviceInfo();
    return {
      ip: basicInfo.ip,
      deviceName: basicInfo.deviceName
    };
  }
}
