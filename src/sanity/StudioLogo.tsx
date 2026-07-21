import Image from 'next/image';

export function StudioLogo(props: any) {
  const { renderDefault, title } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
      <Image
        src="/assets/logo.png"
        alt="LMB Insurance Brokers Logo"
        width={100}
        height={32}
        style={{ objectFit: 'contain', marginRight: '8px' }}
      />
    </div>
  );
}
