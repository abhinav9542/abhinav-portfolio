import { createBrowserRouter } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { HomePage } from '@/pages/HomePage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/work/:slug', element: <ProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
