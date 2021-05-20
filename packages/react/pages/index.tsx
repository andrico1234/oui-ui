import React from 'react';
import Link from 'next/link';

function IndexPage() {
  return (
    <div>
      <nav>
        <Link href="/checkbox">
          <a>Checkbox</a>
        </Link>
      </nav>
    </div>
  );
}

export default IndexPage;
