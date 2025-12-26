/**
 * Encryption Utilities
 * 
 * For sensitive data encryption (if needed)
 * Note: For production, use proper encryption libraries like crypto-js or node:crypto
 */

/**
 * Simple hash function for non-sensitive data
 * For sensitive data, use proper encryption in production
 */
export function hashString(input: string): string {
  // Simple hash for non-sensitive use cases
  // For production, use: crypto.createHash('sha256').update(input).digest('hex')
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Validate encrypted data format
 */
export function isValidEncryptedFormat(data: string): boolean {
  // Basic validation - encrypted data should be base64-like
  return /^[A-Za-z0-9+/=]+$/.test(data) && data.length > 0
}

/**
 * Note: For actual encryption/decryption of sensitive data,
 * use Node.js crypto module or libraries like:
 * - crypto-js
 * - @noble/cipher
 * 
 * Example with Node.js crypto:
 * ```typescript
 * import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
 * 
 * const algorithm = 'aes-256-gcm'
 * const key = process.env.ENCRYPTION_KEY // 32 bytes
 * 
 * export function encrypt(text: string): string {
 *   const iv = randomBytes(16)
 *   const cipher = createCipheriv(algorithm, key, iv)
 *   // ... encryption logic
 * }
 * ```
 */

