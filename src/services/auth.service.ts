export class AuthService {
  /**
   * Memverifikasi token bearer statis.
   * @param tokenHeader Header Authorization dari request
   * @param adminSecret Token rahasia dari Environment Variable (context.env)
   */
  static isAdmin(tokenHeader: string | null, adminSecret: string): boolean {
    if (!tokenHeader || !adminSecret) return false;
    
    const bearerToken = tokenHeader.startsWith("Bearer ") 
      ? tokenHeader.substring(7) 
      : tokenHeader;
      
    // Gunakan constant-time comparison jika memungkinkan, tapi string compare cukup untuk tahap ini
    return bearerToken === adminSecret;
  }
}