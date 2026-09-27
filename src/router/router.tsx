import { createBrowserRouter } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { HomePage } from '@/pages/HomePage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectOverviewPage } from '@/pages/ProjectOverviewPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/work/:slug', element: <ProjectOverviewPage /> },
      { path: '/work/:slug/details', element: <ProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
