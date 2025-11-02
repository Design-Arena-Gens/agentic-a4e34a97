'use client';

import { useState } from 'react';

export default function Home() {
  const [baseEmail, setBaseEmail] = useState('');
  const [service, setService] = useState('');
  const [generatedAliases, setGeneratedAliases] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateAliases = () => {
    if (!baseEmail) return;

    const [localPart, domain] = baseEmail.split('@');
    if (!domain) return;

    const aliases: string[] = [];
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const serviceSlug = service ? service.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    // Alias con +
    if (serviceSlug) {
      aliases.push(`${localPart}+${serviceSlug}@${domain}`);
      aliases.push(`${localPart}+${serviceSlug}.${timestamp}@${domain}`);
    }
    aliases.push(`${localPart}+${timestamp}@${domain}`);
    aliases.push(`${localPart}+${random}@${domain}`);

    // Alias con punto (Gmail)
    if (domain.includes('gmail')) {
      const withDot = localPart.split('').join('.');
      aliases.push(`${withDot}@${domain}`);
    }

    // Alias con guiones
    if (serviceSlug) {
      aliases.push(`${localPart}-${serviceSlug}@${domain}`);
      aliases.push(`${localPart}.${serviceSlug}@${domain}`);
    }
    aliases.push(`${localPart}-${timestamp}@${domain}`);
    aliases.push(`${localPart}.${random}@${domain}`);

    setGeneratedAliases(aliases);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            📧 Generador de Alias de Email
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '40px',
            fontSize: '1.1rem'
          }}>
            Protege tu privacidad con alias únicos y rastreables
          </p>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#333',
              fontSize: '1rem'
            }}>
              Tu Email Base
            </label>
            <input
              type="email"
              value={baseEmail}
              onChange={(e) => setBaseEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#333',
              fontSize: '1rem'
            }}>
              Servicio o Sitio Web (opcional)
            </label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Amazon, Netflix, etc."
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            onClick={generateAliases}
            disabled={!baseEmail || !baseEmail.includes('@')}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              background: baseEmail && baseEmail.includes('@')
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#ccc',
              border: 'none',
              borderRadius: '10px',
              cursor: baseEmail && baseEmail.includes('@') ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: baseEmail && baseEmail.includes('@')
                ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (baseEmail && baseEmail.includes('@')) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = baseEmail && baseEmail.includes('@')
                ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                : 'none';
            }}
          >
            ✨ Generar Aliases
          </button>

          {generatedAliases.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px'
              }}>
                Tus Aliases Generados
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {generatedAliases.map((alias, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px 20px',
                      background: '#f8f9fa',
                      borderRadius: '10px',
                      border: '1px solid #e0e0e0',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f0f0';
                      e.currentTarget.style.borderColor = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }}
                  >
                    <code style={{
                      flex: 1,
                      fontSize: '0.95rem',
                      color: '#333',
                      wordBreak: 'break-all'
                    }}>
                      {alias}
                    </code>
                    <button
                      onClick={() => copyToClipboard(alias, index)}
                      style={{
                        marginLeft: '15px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: copied === index ? '#10b981' : '#667eea',
                        background: 'white',
                        border: `2px solid ${copied === index ? '#10b981' : '#667eea'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (copied !== index) {
                          e.currentTarget.style.background = '#667eea';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (copied !== index) {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#667eea';
                        }
                      }}
                    >
                      {copied === index ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#e0e7ff',
                borderRadius: '10px',
                fontSize: '0.9rem',
                color: '#4338ca',
                lineHeight: '1.6'
              }}>
                <strong>💡 Consejo:</strong> Los alias con "+" funcionan con la mayoría de proveedores.
                Gmail también soporta puntos en el nombre de usuario.
              </div>
            </div>
          )}
        </div>

        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          color: 'white',
          fontSize: '0.9rem',
          opacity: 0.9
        }}>
          <p>Protege tu privacidad • Rastrea quién comparte tu email • Evita el spam</p>
        </div>
      </div>
    </div>
  );
}
