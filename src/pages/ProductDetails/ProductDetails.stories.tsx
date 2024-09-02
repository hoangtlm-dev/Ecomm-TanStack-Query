import { Meta, StoryObj } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router'

// Pages
import { ProductDetails } from '@app/pages'

const meta: Meta = {
  title: 'Pages/ProductDetails',
  component: ProductDetails,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { productSlug: 'Rapidmove-ADV-Trainer-i-12' }
      },
      routing: { path: '/:productSlug' }
    })
  },
  render: () => <ProductDetails />
}

export default meta

type Story = StoryObj<typeof ProductDetails>

export const Default: Story = {}
